import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { GoogleAuthModule } from './auth/google-auth/google-auth.module';
import { DatabaseConfig } from './shared/database.config';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UserModule,
    WalletModule,
    GoogleAuthModule,
    ResultModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
