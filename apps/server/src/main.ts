import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configDotenv } from 'dotenv';
import * as cookieParser from 'cookie-parser';
if (process.env.RAILWAY_ENVIRONMENT_NAME !== 'production') {
  configDotenv();
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableCors();

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
