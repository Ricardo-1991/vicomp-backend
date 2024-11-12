import { CreateUserDto } from '../dtos/createUserDto';
import { UserResponseDto } from '../dtos/userResponseDto';

export abstract class UserRepository {
  abstract findAll(): Promise<UserResponseDto[]>;
  abstract findUnique(email: string, cpf: string): Promise<UserResponseDto>;
  abstract create(user: CreateUserDto): Promise<UserResponseDto>;
}
