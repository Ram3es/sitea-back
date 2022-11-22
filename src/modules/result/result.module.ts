import { ResultEntity } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ResultEntity]), UserModule],
  providers: [ResultService],
  controllers: [ResultController],
})
export class ResultModule {}
