import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @ApiProperty()
  day: Date;
  correct: number;
  hunched: number;
  incorrect: number;
  away: number;
  userId: string;
}
