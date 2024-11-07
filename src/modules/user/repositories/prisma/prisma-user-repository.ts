import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../user.repository';
import { CreateUserDto } from '../../dtos/createUserDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CreateUserDto[]> {
    return await this.prisma.user.findMany();
  }
  async findUnique(email: string, cpf: string): Promise<CreateUserDto | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { cpf: cpf }],
      },
    });
  }

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    return await this.prisma.user.create({
      data: {
        name: user.name,
        gender: user.gender,
        birthDate: user.birthDate,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        cityId: user.cityId,
        privacyPolicyAccepted: user.privacyPolicyAccepted,
      },
    });
  }
}
