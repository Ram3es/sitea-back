import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from 'src/constants/roles';
import { WalletEnity } from 'src/wallet/entities/wallet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  updated: Date;

  @Column()
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.user,
  })
  @ApiProperty({ example: ROLES.user })
  role: ROLES;

  @OneToMany(() => WalletEnity, (data) => data.user)
  wallets: string[];
}
