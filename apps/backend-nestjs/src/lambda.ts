import {NestFactory} from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';
import express from 'express';
import {AppModule} from './app.module';

let cachedServer: any;

async function bootstrapForLambda() {
    if (!cachedServer) {
        const expressApp = express();

        const app = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
            {
                logger: ['error', 'warn', 'log'],
            },
        );

        app.enableCors({
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        });

        app.setGlobalPrefix('api');

        await app.init();

        cachedServer = serverlessExpress({app: expressApp});
    }

    return cachedServer;
}

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context,
): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;

    const server = await bootstrapForLambda();

    return server(event, context);
};