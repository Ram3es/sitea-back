import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletEnity } from 'src/modules/wallet/entities/wallet.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { NearWalletEntity } from './../near/entities/near-wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WalletEnity, NearWalletEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
