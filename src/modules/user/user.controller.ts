import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDto) {
    const newUser = await this.userService.create(user);
    return {
      message: 'Usuário criado com sucesso.',
      data: newUser,
    };
  }
}
