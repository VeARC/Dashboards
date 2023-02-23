import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get('getUserByUserName')
  getUserByUserName(@Query('userName') userName: string) {
    return this.usersService.getUserByUserName(userName);
  }
}
