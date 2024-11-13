import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createuser.dto';
import { UserRepository } from './repositories/user.repository';

import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dtos/userresponse.dto';

@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository) {}

  async findAll(): Promise<UserResponseDto[]> {
    return await this.UserRepository.findAll();
  }

  async findUnique(email: string): Promise<UserResponseDto> {
    return await this.UserRepository.findUnique(email);
  }

  async create(user: CreateUserDto): Promise<UserResponseDto> {
    const userExists = await this.UserRepository.findUnique(user.email);
    if (userExists) {
      throw new HttpException(
        'Usuário com este email ja cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.privacyPolicyAccepted) {
      throw new HttpException(
        'Usuário precisa aceitar a política de privacidade.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = 10;
    try {
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const createUser = { ...user, password: hashedPassword };
      return await this.UserRepository.create(createUser);
    } catch (error) {
      console.log('Aqui esta o erro detalhado', error);
      throw new HttpException(
        'Erro ao criar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
