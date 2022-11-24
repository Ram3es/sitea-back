import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from 'src/modules/user/user.service';
import { ResultEntity } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(ResultEntity)
    private readonly resultRepository: Repository<ResultEntity>,
    private readonly userService: UserService
  ) {}

  async createResult(body: CreateResultDto) {
    const { userId, ...rest } = body;
    const user = await this.userService.getUserById(userId);

    await this.resultRepository.save({
      ...rest,
      user,
    });
  }
}
