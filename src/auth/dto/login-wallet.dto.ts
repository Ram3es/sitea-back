import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WalletDto {
  @ApiProperty()
  @IsNotEmpty()
  wallet: string;
}
