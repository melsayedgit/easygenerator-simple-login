import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { configDotenv } from 'dotenv';
import { LoggerService } from './logger/logger.service';

configDotenv();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
