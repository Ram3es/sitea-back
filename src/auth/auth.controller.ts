import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WalletDto } from './dto/login-wallet.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('wallet-login')
  async walletLogin(@Body() body: WalletDto) {
    return this.authService.signInWallet(body);
  }
}
