import { CreateUserDto } from '../dtos/createUserDto';

export abstract class UserRepository {
  abstract findAll(): Promise<CreateUserDto[]>;
  abstract findUnique(email: string, cpf: string): Promise<CreateUserDto>;
  abstract create(user: CreateUserDto): Promise<CreateUserDto>;
}
