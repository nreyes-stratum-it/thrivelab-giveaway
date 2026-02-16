import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import {HttpLambdaIntegration} from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as logs from 'aws-cdk-lib/aws-logs';
import {Construct} from 'constructs';
import * as path from 'node:path';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import {SqsEventSource} from 'aws-cdk-lib/aws-lambda-event-sources';

export class ThriveLabStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const frontendBucket = new s3.Bucket(this, 'FrontendBucket', {
            bucketName: `thrivelab-frontend-${this.account}`,
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            encryption: s3.BucketEncryption.S3_MANAGED,
            versioned: true,
            lifecycleRules: [
                {
                    id: 'DeleteOldVersions',
                    noncurrentVersionExpiration: cdk.Duration.days(30),
                },
            ],
        });

        const cachePolicy = new cloudfront.CachePolicy(this, 'NextJsCachePolicy', {
            cachePolicyName: 'ThriveLabNextJsCache',
            comment: 'Optimized cache policy for Next.js static files',
            defaultTtl: cdk.Duration.days(1),
            maxTtl: cdk.Duration.days(365),
            minTtl: cdk.Duration.seconds(0),
            cookieBehavior: cloudfront.CacheCookieBehavior.none(),
            headerBehavior: cloudfront.CacheHeaderBehavior.none(),
            queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
            enableAcceptEncodingGzip: true,
            enableAcceptEncodingBrotli: true,
        });

        const distribution = new cloudfront.Distribution(this, 'FrontendDistribution', {
            comment: 'ThriveLabGiveaway Frontend Distribution',
            defaultBehavior: {
                origin: origins.S3BucketOrigin.withOriginAccessControl(frontendBucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cachePolicy: cachePolicy,
                allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
                compress: true,
            },
            defaultRootObject: 'giveaway/index.html',
            priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
            geoRestriction: cloudfront.GeoRestriction.allowlist('US'),
            httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
            enabled: true,
        });

        const notificationDLQ = new sqs.Queue(this, 'NotificationDLQ', {
            queueName: 'thrivelab-notification-dlq',
            retentionPeriod: cdk.Duration.days(14),
            encryption: sqs.QueueEncryption.SQS_MANAGED,
        });

        const notificationQueue = new sqs.Queue(this, 'NotificationQueue', {
            queueName: 'thrivelab-notification-queue',
            visibilityTimeout: cdk.Duration.seconds(180),
            receiveMessageWaitTime: cdk.Duration.seconds(20),
            retentionPeriod: cdk.Duration.days(4),
            deadLetterQueue: {
                queue: notificationDLQ,
                maxReceiveCount: 3,
            },
            encryption: sqs.QueueEncryption.SQS_MANAGED,
        });

        const emailNotificationLambda = new lambda.Function(this, 'EmailNotificationLambda', {
            functionName: 'ThriveLabEmailNotification',
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'dist/index.handler',
            code: lambda.Code.fromAsset(
                path.join(__dirname, 'lambda/email-notification'),
                {
                    exclude: ['dist', 'node_modules', '*.log', 'cdk.out'],

                    bundling: {
                        image: lambda.Runtime.NODEJS_20_X.bundlingImage,
                        user: 'root',
                        command: [
                            'bash', '-c',
                            [
                                'cp -r . /asset-output',
                                'cd /asset-output',

                                'export npm_config_cache=/tmp/.npm',
                                'mkdir -p /tmp/.npm',

                                'npm install typescript @types/node @types/aws-lambda @aws-sdk/client-ses',

                                'npx tsc',

                                'echo "=== Compiled files ==="',
                                'ls -la dist/ || echo "ERROR: dist/ not found!"',
                                'test -f dist/index.js || exit 1',

                                'rm -rf node_modules',

                                'npm install --omit=dev @aws-sdk/client-ses',

                                'echo "=== Final package contents ==="',
                                'du -sh .',
                                'ls -la',
                            ].join(' && '),
                        ],
                    },
                }
            ),
            memorySize: 256,
            timeout: cdk.Duration.seconds(60),
            environment: {
                ADMIN_EMAIL: cdk.Fn.ref('AdminEmail'),
                FROM_EMAIL: cdk.Fn.ref('FromEmail'),
                FRONTEND_URL: `https://${distribution.distributionDomainName}`,
            },
            logGroup: new logs.LogGroup(this, 'EmailNotificationLogGroup', {
                logGroupName: '/aws/lambda/ThriveLabEmailNotification',
                retention: logs.RetentionDays.ONE_WEEK,
                removalPolicy: cdk.RemovalPolicy.DESTROY,
            }),
        });

        emailNotificationLambda.addToRolePolicy(
            new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: ['ses:SendEmail', 'ses:SendRawEmail'],
                resources: ['*'],
            })
        );

        emailNotificationLambda.addEventSource(
            new SqsEventSource(notificationQueue, {
                batchSize: 10,
                maxBatchingWindow: cdk.Duration.seconds(5),
                reportBatchItemFailures: true,
            })
        );

        const backendLambda = new lambda.Function(this, 'BackendLambda', {
            functionName: 'ThriveLabGiveawayBackend',
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'src/lambda.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, '../../apps/backend-nestjs/lambda.zip')),
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),
            environment: {
                NODE_ENV: 'production',
                DATABASE_URL: cdk.Fn.ref('DatabaseUrl'),
                FRONTEND_URL: `https://${distribution.distributionDomainName}`,
                PORT: '3001',
                NOTIFICATION_QUEUE_URL: notificationQueue.queueUrl,
            },
            logGroup: new logs.LogGroup(this, 'BackendLambdaLogGroup', {
                logGroupName: '/aws/lambda/ThriveLabGiveawayBackend',
                retention: logs.RetentionDays.ONE_WEEK,
                removalPolicy: cdk.RemovalPolicy.DESTROY,
            }),
            tracing: lambda.Tracing.ACTIVE,
        });

        notificationQueue.grantSendMessages(backendLambda);

        const httpApi = new apigatewayv2.HttpApi(this, 'BackendHttpApi', {
            apiName: 'ThriveLabGiveaway API',
            description: 'HTTP API for ThriveLabGiveaway NestJS backend',
            corsPreflight: {
                allowOrigins: [
                    `https://${distribution.distributionDomainName}`,
                    'http://localhost:3000',
                ],
                allowMethods: [
                    apigatewayv2.CorsHttpMethod.GET,
                    apigatewayv2.CorsHttpMethod.POST,
                    apigatewayv2.CorsHttpMethod.PUT,
                    apigatewayv2.CorsHttpMethod.DELETE,
                    apigatewayv2.CorsHttpMethod.OPTIONS,
                ],
                allowHeaders: [
                    'Content-Type',
                    'Authorization',
                    'X-Api-Key',
                ],
                allowCredentials: true,
                maxAge: cdk.Duration.days(1),
            },
        });

        const lambdaIntegration = new HttpLambdaIntegration(
            'LambdaIntegration',
            backendLambda,
            {
                payloadFormatVersion: apigatewayv2.PayloadFormatVersion.VERSION_2_0,
            },
        );

        httpApi.addRoutes({
            path: '/api/{proxy+}',
            methods: [apigatewayv2.HttpMethod.ANY],
            integration: lambdaIntegration,
        });

        httpApi.addRoutes({
            path: '/api',
            methods: [apigatewayv2.HttpMethod.ANY],
            integration: lambdaIntegration,
        });

        new cdk.CfnParameter(this, 'DatabaseUrl', {
            type: 'String',
            description: 'Database connection string (PostgreSQL or MongoDB)',
            noEcho: true,
        });

        new cdk.CfnParameter(this, 'AdminEmail', {
            type: 'String',
            description: 'Admin email for notifications',
            default: 'admin@thrivelab.com',
        });

        new cdk.CfnParameter(this, 'FromEmail', {
            type: 'String',
            description: 'Verified SES email address',
            default: 'noreply@thrivelab.com',
        });

        new cdk.CfnOutput(this, 'FrontendBucketName', {
            value: frontendBucket.bucketName,
            description: 'S3 Bucket name for frontend',
            exportName: 'ThriveLabFrontendBucket',
        });

        new cdk.CfnOutput(this, 'CloudFrontURL', {
            value: `https://${distribution.distributionDomainName}`,
            description: 'CloudFront Distribution URL (Frontend)',
            exportName: 'ThriveLabFrontendURL',
        });

        new cdk.CfnOutput(this, 'CloudFrontDistributionId', {
            value: distribution.distributionId,
            description: 'CloudFront Distribution ID (for cache invalidation)',
            exportName: 'ThriveLabDistributionId',
        });

        new cdk.CfnOutput(this, 'ApiGatewayURL', {
            value: httpApi.url!,
            description: 'HTTP API Gateway endpoint URL (Backend API)',
            exportName: 'ThriveLabApiURL',
        });

        new cdk.CfnOutput(this, 'BackendLambdaArn', {
            value: backendLambda.functionArn,
            description: 'Backend Lambda function ARN',
            exportName: 'ThriveLabLambdaArn',
        });

        new cdk.CfnOutput(this, 'NotificationQueueUrl', {
            value: notificationQueue.queueUrl,
            exportName: 'ThriveLabNotificationQueueUrl',
        });
    }
}