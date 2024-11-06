import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../user.repository';
import { createUserDto } from '../../dtos/createUserDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<createUserDto[]> {
    return await this.prisma.user.findMany();
  }
  async findUnique(email: string, cpf: string): Promise<createUserDto | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { cpf: cpf }],
      },
    });
  }

  async create(user: createUserDto): Promise<createUserDto> {
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
