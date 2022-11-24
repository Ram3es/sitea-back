import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ROLES } from 'src/constants/roles';
import { ERRORS } from 'src/constants/errors';

import { UserEntity } from './entities/user.entity';
import { AddWalletDto } from './dto/add-metamask.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { NearWalletEntity } from './../near/entities/near-wallet.entity';
import { WalletEnity } from '../wallet/entities/wallet.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(WalletEnity)
    private readonly walletRepository: Repository<WalletEnity>,
    @InjectRepository(NearWalletEntity)
    private readonly nearWalletRepository: Repository<NearWalletEntity>
  ) {}

  async getAllUsers() {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.role = (:role)', {
        role: ROLES.user,
      })
      .leftJoinAndSelect('user.wallets', 'wallet')
      .leftJoinAndSelect('user.nearWallets', 'near')
      .leftJoinAndSelect('user.results', 'result')
      .select([
        'user.id',
        'user.email',
        'wallet.wallet',
        'near.wallet',
        'result.away',
        'result.correct',
        'result.hunched',
        'result.incorrect',
      ])
      .getMany();
  }

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
      relations: { wallets: true, nearWallets: true },
    });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUserEmail(body: UpdateEmailDto) {
    const existedUser = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (existedUser) {
      throw new HttpException(ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    const user = await this.getUserById(body.userId);
    await this.userRepository.update(user.id, { email: body.email });
  }

  async addMetamaskWallet(body: AddWalletDto) {
    const { wallet, userId } = body;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.wallets', 'wallet')
      .where('wallet.wallet =(:wallet)', { wallet })
      .getOne();

    if (user) {
      throw new HttpException(ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    const existUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    await this.walletRepository.save({
      wallet,
      user: existUser,
    });

    return this.getUserById(existUser.id);
  }

  async addNearWallet(body: AddWalletDto) {
    const { wallet, userId } = body;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.nearWallets', 'near')
      .where('near.wallet =(:wallet)', { wallet })
      .getOne();

    if (user) {
      throw new HttpException(ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    const existUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    await this.nearWalletRepository.save({
      wallet,
      user: existUser,
    });
    return this.getUserById(existUser.id);
  }
}
