import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from 'src/constants/roles';
import { WalletEnity } from 'src/modules/wallet/entities/wallet.entity';
import { NearWalletEntity } from 'src/modules/near/entities/near-wallet.entity';

import { ResultEntity } from '../../result/entities/result.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @CreateDateColumn()
  @ApiProperty({ example: new Date() })
  created: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: new Date() })
  @Exclude()
  updated: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.user,
  })
  @ApiProperty({ example: ROLES.user })
  role: ROLES;

  @Column({
    type: 'varchar',
  })
  @Exclude()
  publicKey: string;

  @OneToMany(() => WalletEnity, (data) => data.user, { cascade: true })
  wallets: WalletEnity[];

  @OneToMany(() => NearWalletEntity, (data) => data.user, { cascade: true })
  nearWallets: NearWalletEntity[];

  @OneToMany(() => ResultEntity, (data) => data.user)
  results: ResultEntity[];
}
