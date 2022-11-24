import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  wallet: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
