import { Injectable } from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { ENV_VAR } from 'src/constants/env-variables';
import { TokenVerifyDto } from '../dto/token-verify.dto';

@Injectable()
export class GoogleAuthService {
  oAuthClient: Auth.OAuth2Client;
  constructor() {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = ENV_VAR;

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

    return '';
  }
}
