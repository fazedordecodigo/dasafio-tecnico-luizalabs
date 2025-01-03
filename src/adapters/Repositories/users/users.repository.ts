import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../Services/prisma.service';
import { User } from '@prisma/client';
import { UUID } from 'node:crypto';
import { UsersRepositoryProtocol } from 'src/ports/Application/Protocols/users.repository.protocol';

@Injectable()
export class UsersRepository implements UsersRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: UUID): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAll(skip?: number, take?: number): Promise<User[]> {
    return await this.prisma.user.findMany({ skip, take });
  }

  async create(data: User): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async update(data: User): Promise<User> {
    return await this.prisma.user.update({
      data,
      where: { id: data.id },
    });
  }

  async delete(id: UUID): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
