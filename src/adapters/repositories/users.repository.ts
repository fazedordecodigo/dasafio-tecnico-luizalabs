import { Injectable } from '@nestjs/common';
import { PrismaService } from '@adapters/services/prisma.service';
import { UsersRepositoryProtocol } from '@ports/application/protocols';
import { User } from '@ports/domain/entities';

@Injectable()
export class UsersRepository implements UsersRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

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