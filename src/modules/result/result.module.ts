import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';

import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { ResultEntity } from './entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultEntity]), UserModule],
  providers: [ResultService],
  controllers: [ResultController],
})
export class ResultModule {}
