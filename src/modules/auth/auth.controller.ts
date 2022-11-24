import { Body, Controller, Post } from '@nestjs/common';

import { AUTH_ROUTES } from './auth.constants';
import { AuthService } from './auth.service';
import { WalletDto } from './dto/login-wallet.dto';

@Controller(AUTH_ROUTES.main)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ROUTES.metamaskLogin)
  async walletLogin(@Body() body: WalletDto) {
    return this.authService.signInWallet(body);
  }

  @Post(AUTH_ROUTES.nearLogin)
  async nearLogin(@Body() body: WalletDto) {
    return this.authService.nearLogin(body.wallet);
  }
}
