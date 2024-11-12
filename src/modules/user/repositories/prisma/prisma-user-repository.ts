import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../user.repository';
import { CreateUserDto } from '../../dtos/createUserDto';
import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../../dtos/userResponseDto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserResponseDto[]> {
    const allUsers = await this.prisma.user.findMany({
      include: {
        Address: true,
      },
    });
    return allUsers.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cpf: user.cpf,
      address: {
        street: user.Address.street,
        number: user.Address.number,
        zipcode: user.Address.zipcode,
        city: user.Address.city,
      },
    }));
  }
  async findUnique(
    email: string,
    cpf: string,
  ): Promise<UserResponseDto | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { cpf: cpf }],
      },
    });
  }

  async create(user: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = await this.prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        birthDate: new Date(user.birthDate),
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        privacyPolicyAccepted: user.privacyPolicyAccepted,
        Address: {
          create: {
            street: user.address.street,
            number: user.address.number,
            zipcode: user.address.zipcode,
            city: user.address.city,
          },
        },
      },
      include: {
        Address: true,
      },
    });
    const userResponse = {
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      cpf: createdUser.cpf,
      address: {
        street: createdUser.Address.street,
        number: createdUser.Address.number,
        zipcode: createdUser.Address.zipcode,
        city: createdUser.Address.city,
      },
    };
    return userResponse;
  }
}
