import {NestFactory} from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';
import express from 'express';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from "./shared/filters/http-exception.filter";
import {ValidationExceptionFilter} from "./shared/filters/validation-exception.filter";

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
        app.setGlobalPrefix('api');

        app.enableCors({
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        });

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            })
        )

        app.useGlobalFilters(
            new HttpExceptionFilter(),
            new ValidationExceptionFilter()
        )

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