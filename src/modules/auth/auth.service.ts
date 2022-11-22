import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';

import { EXPIRE_JWT_TIME } from 'src/constants/format';
import { UserService } from 'src/modules/user/user.service';
import { WalletEnity } from 'src/modules/wallet/entities/wallet.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

import { WalletDto } from './dto/login-wallet.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(WalletEnity)
    private readonly walletRepository: Repository<WalletEnity>
  ) {}

  createToken(user: UserEntity) {
    const expiresIn = EXPIRE_JWT_TIME + Date.now();
    const data = { id: user.id, expiresIn, role: user.role };
    const secret = this.createSecretString(user.publicKey);
    return this.jwtService.sign(data, { secret });
  }

  private createSecretString(personalKey: string) {
    const secret = this.configService.get('JWT_SECRET_KEY');
    return `${secret}${personalKey}`;
  }

  async signIn(email: string) {
    const emailUser = email.toLowerCase();

    const user = await this.userRepository.findOne({
      where: { email: emailUser },
    });

    const publicKey = await bcrypt.genSalt(6);

    if (!user) {
      const newUser = await this.userRepository.save({
        email,
        publicKey,
      });
      const token = this.createToken(newUser);

      return {
        user: this.userSerialize(newUser),
        token,
      };
    }

    await this.userRepository.update(user.id, {
      publicKey,
    });

    const newUser = await this.userService.getUserById(user.id);

    const token = this.createToken(newUser);

    return {
      user: this.userSerialize(newUser),
      token,
    };
  }
  async signInWallet(body: WalletDto) {
    const { wallet } = body;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.wallets', 'wallet')
      .where('wallet.wallet =(:wallet)', { wallet })
      .getOne();

    const publicKey = await bcrypt.genSalt(6);

    if (!user) {
      const newUser = await this.userRepository.save({
        publicKey,
      });

      await this.walletRepository.save({
        wallet,
        newUser,
      });

      const userWithWallet = await this.userRepository.findOne({
        where: { id: user.id },
        relations: { wallets: true },
      });
      const token = this.createToken(newUser);

      return {
        user: this.userSerialize(userWithWallet),
        token,
      };
    }
    await this.userRepository.update(user.id, {
      publicKey,
    });
    const updatedUser = await this.userService.getUserById(user.id);
    const token = this.createToken(updatedUser);

    return {
      user: this.userSerialize(updatedUser),
      token,
    };
  }

  userSerialize(user: UserEntity) {
    const { publicKey, updated, ...rest } = user;
    const userSeriliazed = instanceToPlain(rest);

    return userSeriliazed;
  }
}
