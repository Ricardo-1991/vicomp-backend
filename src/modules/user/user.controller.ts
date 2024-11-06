import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/createUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
  @Post()
  async create(@Body() user: createUserDto) {
    return await this.userService.create(user);
  }
}
