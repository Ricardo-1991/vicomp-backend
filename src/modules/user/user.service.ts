import { Injectable } from '@nestjs/common';
import { createUserDto } from './dtos/createUserDto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository) {}

  async findAll(): Promise<any[]> {
    return await this.UserRepository.findAll();
  }

  async create(user: createUserDto): Promise<createUserDto> {}
}
