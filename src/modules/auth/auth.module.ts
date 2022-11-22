import { WalletEnity } from 'src/modules/wallet/entities/wallet.entity';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WalletModule } from 'src/modules/wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WalletEnity]),
    JwtModule.register({}),
    UserModule,
    WalletModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
