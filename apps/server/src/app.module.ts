import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { configDotenv } from 'dotenv';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { JwtModule } from '@nestjs/jwt';

if (process.env.RAILWAY_ENVIRONMENT_NAME !== 'production') {
  configDotenv();
}
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    AuthModule,
    LoggerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
