import { Body, Controller, Post } from '@nestjs/common';

import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post('create')
  async createResult(@Body() body: CreateResultDto) {
    return this.resultService.createResult(body);
  }
}
