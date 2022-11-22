import { WalletEnity } from './entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEnity])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
