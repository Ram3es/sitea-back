import { Body, Controller, Post } from '@nestjs/common';
import { TokenVerifyDto } from '../dto/token-verify.dto';

import { GOOGLE_ROUTES } from './google-auth.constatnts';
import { GoogleAuthService } from './google-auth.service';

@Controller(GOOGLE_ROUTES.google)
export class GoogleAuthController {
  constructor(private googleAuthService: GoogleAuthService) {}

  @Post(GOOGLE_ROUTES.auth)
  async auth(@Body() tokenData: TokenVerifyDto) {
    return this.googleAuthService.authenticate(tokenData.token);
  }
}
