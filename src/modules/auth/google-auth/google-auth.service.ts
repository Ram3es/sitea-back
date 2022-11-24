import { Auth, google } from 'googleapis';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserService } from 'src/modules/user/user.service';
import { AuthService } from '../auth.service';
import { TokenVerifyDto } from '../dto/token-verify.dto';

@Injectable()
export class GoogleAuthService {
  oAuthClient: Auth.OAuth2Client;
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
    private userService: UserService
  ) {
    const GOOGLE_CLIENT_ID = this.configService.get('GOOGLE_CLIENT_ID');
    const GOOGLE_CLIENT_SECRET = this.configService.get('GOOGLE_CLIENT_SECRET');

    this.oAuthClient = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET
    );
  }

  public async authenticate(tokenData: TokenVerifyDto) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oAuthClient.setCredentials({
      access_token: tokenData.token,
    });

    const { data } = await userInfoClient.get({
      auth: this.oAuthClient,
    });
    const userEmail = data.email;

    if (tokenData.userId) {
      const { userId } = tokenData;
      await this.userService.updateUserEmail({
        email: userEmail,
        userId,
      });
      const user = await this.userService.getUserById(userId);

      return { user };
    }

    return this.authService.signIn(userEmail);
  }
}
