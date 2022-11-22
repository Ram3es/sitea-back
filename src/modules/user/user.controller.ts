import { Controller, Get, Param } from '@nestjs/common';
import { USER_ROUTES } from './user.constatnts';
import { UserService } from './user.service';

@Controller(USER_ROUTES.main)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(USER_ROUTES.getUserById)
  async getUserByIdWithResults(@Param() param: { id: string }) {
    const { id } = param;
    return this.userService.getUserByIdWithResults(id);
  }
}
