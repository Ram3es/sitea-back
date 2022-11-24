import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletService } from './wallet.service';
import { WalletEnity } from './entities/wallet.entity';
import { WalletController } from './wallet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEnity])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
