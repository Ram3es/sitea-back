import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleAuthService {
  oAuthClient: Auth.OAuth2Client;
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService
  ) {
    const GOOGLE_CLIENT_ID = this.configService.get('GOOGLE_CLIENT_ID');
    const GOOGLE_CLIENT_SECRET = this.configService.get('GOOGLE_CLIENT_SECRET');

    this.oAuthClient = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET
    );
  }

  public async authenticate(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oAuthClient.setCredentials({
      access_token: token,
    });

    const { data } = await userInfoClient.get({
      auth: this.oAuthClient,
    });
    const userEmail = data.email;

    return this.authService.signIn(userEmail);
  }
}
