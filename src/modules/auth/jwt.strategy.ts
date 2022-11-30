import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly cofigService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: async (
        request: Request,
        rawJwtToken: string,
        done: (err: any, secret: string) => void
      ) => {
        const decodedToken: { id: string } = jwt.decode(rawJwtToken) as {
          id: string;
        };
        const user = await this.userService.getUserById(decodedToken.id);
        const JWT_SECRET = this.cofigService.get('JWT_SECRET_KEY');

        done(null, `${JWT_SECRET}${user.publicKey}`);
      },
    });
  }
  async validate(payload: any) {
    return this.userService.getUserById(payload.id);
  }
}
