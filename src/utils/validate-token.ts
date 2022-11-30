import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ERRORS } from 'src/constants/errors';

export const validateToken = async (auth: string, roles?: string[]) => {
  const [bearer, token] = auth.split(' ');
  if (bearer !== 'Bearer' || !token) {
    throw new HttpException(ERRORS.invalidToken, HttpStatus.FORBIDDEN);
  }
  try {
    const resp: any = jwt.decode(token);

    if (!roles?.includes(resp.role)) {
      throw new HttpException(ERRORS.invalidRole, HttpStatus.FORBIDDEN);
    }

    if (!resp.expiresIn || Date.now() > resp.expiresIn) {
      throw new HttpException(ERRORS.tokenExpired, HttpStatus.UNAUTHORIZED);
    }

    return resp;
  } catch (error) {
    throw new HttpException(
      `${ERRORS.tokenError}: ${error.message || error.name}`,
      HttpStatus.FORBIDDEN
    );
  }
};
