import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @ApiProperty()
  day: Date;

  @ApiProperty()
  correct: number;

  @ApiProperty()
  hunched: number;

  @ApiProperty()
  incorrect: number;

  @ApiProperty()
  away: number;

  @ApiProperty()
  userId: string;
}
