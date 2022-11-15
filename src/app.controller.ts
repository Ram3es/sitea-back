import * as fs from 'fs';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    const rev = fs.readFileSync('.git/HEAD').toString().trim();
    const commitHash = fs
      .readFileSync('.git/' + rev.substring(5))
      .toString()
      .trim();

    return `SITYEA API: Running ${process.env.NODE_ENV} version, last commit: ${commitHash}`;
  }
}
