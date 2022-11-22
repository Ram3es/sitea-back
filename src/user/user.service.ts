import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUserByIdWithResults(id: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ id })
      .leftJoinAndSelect('user.wallets', 'wallet')
      .leftJoinAndSelect('user.results', 'results')
      .getOne();
  }
  async getUserById(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: { wallets: true },
    });
  }
}
