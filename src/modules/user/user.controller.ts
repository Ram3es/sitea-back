import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { AddWalletDto } from './dto/add-metamask.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
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

  @Get(USER_ROUTES.getAllUsers)
  @UseGuards(new RolesGuard(['admin']))
  async getAllUses() {
    return this.userService.getAllUsers();
  }
  @Post(USER_ROUTES.updateEmail)
  @UseGuards(JwtAuthGuard)
  async connectEmail(@Body() body: UpdateEmailDto) {
    return this.userService.updateUserEmail(body);
  }
  @Post(USER_ROUTES.addMetamask)
  @UseGuards(JwtAuthGuard)
  async addMetamaskWallet(@Body() body: AddWalletDto) {
    return this.userService.addMetamaskWallet(body);
  }
  @Post(USER_ROUTES.addNearWallet)
  @UseGuards(JwtAuthGuard)
  async addNearWallet(@Body() body: AddWalletDto) {
    return this.userService.addNearWallet(body);
  }
}
