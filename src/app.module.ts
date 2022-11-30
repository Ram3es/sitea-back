import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { DatabaseConfig } from './shared/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { ResultModule } from './modules/result/result.module';
import { GoogleAuthModule } from './modules/auth/google-auth/google-auth.module';
import { NearModule } from './modules/near/near.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exception.filter';

const currentEnv = process.env.NODE_ENV || 'local';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${currentEnv}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UserModule,
    WalletModule,
    GoogleAuthModule,
    ResultModule,
    NearModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
