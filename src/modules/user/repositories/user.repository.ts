import { createUserDto } from '../dtos/createUserDto';

export abstract class UserRepository {
  abstract findAll(): Promise<createUserDto[]>;
  abstract findUnique(email: string, cpf: string): Promise<createUserDto>;
  abstract create(user: createUserDto): Promise<createUserDto>;
}
