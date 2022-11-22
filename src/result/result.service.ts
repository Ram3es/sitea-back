import { UserService } from 'src/user/user.service';
import { ResultEntity } from './entities/result.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
