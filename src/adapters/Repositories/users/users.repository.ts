import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../Services/prisma.service';
import { UsersRepositoryProtocol } from 'src/ports/Application/Protocols/users.repository.protocol';
import { User } from 'src/ports/Domain/entities/user.entity';

@Injectable()
export class UsersRepository implements UsersRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<User | null> {
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

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
