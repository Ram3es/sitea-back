import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('result')
export class ResultEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column({ type: 'timestamptz', precision: 3 })
  @ApiProperty({ example: new Date() })
  day: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: '60' })
  correct: number;

  @Column({ nullable: true })
  @ApiProperty({ example: '90' })
  hunched: number;

  @Column({ nullable: true })
  @ApiProperty({ example: '185' })
  incorrect: number;

  @Column({ nullable: true })
  @ApiProperty({ example: '360' })
  away: number;

  @CreateDateColumn()
  @ApiProperty({ example: new Date() })
  created: Date;

  @ManyToOne(() => UserEntity, (data) => data.results)
  user: UserEntity;
}
