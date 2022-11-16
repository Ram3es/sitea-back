import { UserEntity } from './../../user/entities/user.entity';
import { Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallet')
export class WalletEnity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column({ nullable: true })
  wallet: string;

  @ManyToOne(() => UserEntity, (data) => data.wallets)
  user: UserEntity;
}
