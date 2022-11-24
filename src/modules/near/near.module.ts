import { NearService } from './near.service';
import { NearController } from './near.controller';
import { NearWalletEntity } from 'src/modules/near/entities/near-wallet.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NearWalletEntity])],
  controllers: [NearController],
  providers: [NearService],
})
export class NearModule {}
