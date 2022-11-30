import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletModule } from 'src/modules/wallet/wallet.module';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WalletEnity } from 'src/modules/wallet/entities/wallet.entity';
import { NearWalletEntity } from 'src/modules/near/entities/near-wallet.entity';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { NearModule } from '../near/near.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WalletEnity, NearWalletEntity]),
    JwtModule.register({}),
    PassportModule,
    UserModule,
    WalletModule,
    NearModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
