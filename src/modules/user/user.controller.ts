import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createuser.dto';
import { Public } from 'src/decorators/is-public';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
  @Public()
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
