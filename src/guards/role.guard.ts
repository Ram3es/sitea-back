import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ERRORS } from 'src/constants/errors';
import { ROLES } from 'src/constants/roles';
import { validateToken } from 'src/utils/validate-token';

type TRoles = keyof typeof ROLES;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private roles: TRoles[]) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new HttpException(ERRORS.invalidRole, HttpStatus.FORBIDDEN);
    }
    await validateToken(request.headers.authorization, this.roles);
    return true;
  }
}
