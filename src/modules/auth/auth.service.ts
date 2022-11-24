import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { EXPIRE_JWT_TIME } from 'src/constants/format';
import { UserService } from 'src/modules/user/user.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WalletEnity } from 'src/modules/wallet/entities/wallet.entity';
import { NearWalletEntity } from 'src/modules/near/entities/near-wallet.entity';

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
    private readonly walletRepository: Repository<WalletEnity>,
    @InjectRepository(NearWalletEntity)
    private readonly nearWalletRepository: Repository<NearWalletEntity>
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

      const userWithWallets = await this.userService.getUserById(newUser.id);

      return {
        user: this.userSerialize(userWithWallets),
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
        user: newUser,
      });
      const userWithWallet = await this.userRepository.findOne({
        where: { id: newUser.id },
        relations: { wallets: true, nearWallets: true },
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

  async nearLogin(wallet: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.nearWallets', 'near')
      .where('near.wallet =(:wallet)', { wallet })
      .getOne();

    const publicKey = await bcrypt.genSalt(6);
    if (!user) {
      const newUser = await this.userRepository.save({
        publicKey,
      });

      await this.nearWalletRepository.save({
        wallet,
        user: newUser,
      });

      const userWithWallet = await this.userRepository.findOne({
        where: { id: newUser.id },
        relations: { nearWallets: true, wallets: true },
      });
      const token = this.createToken(userWithWallet);

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
