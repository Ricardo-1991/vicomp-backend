import { CreateUserDto } from '../dtos/createuser.dto';
import { UserResponseDto } from '../dtos/userresponse.dto';

export abstract class UserRepository {
  abstract findAll(): Promise<UserResponseDto[]>;
  abstract findUnique(email: string): Promise<UserResponseDto>;
  abstract create(user: CreateUserDto): Promise<UserResponseDto>;
}
