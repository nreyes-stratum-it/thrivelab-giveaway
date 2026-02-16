import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from "./shared/filters/http-exception.filter";
import {ValidationExceptionFilter} from "./shared/filters/validation-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
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

    const port = process.env.PORT || 3000;

    await app.listen(port);
    console.log('Server is running on port: ' + port)

}

bootstrap();
