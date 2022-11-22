import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class TokenVerifyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
