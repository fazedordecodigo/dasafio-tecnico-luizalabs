import { Injectable } from '@nestjs/common';
import { PrismaService } from '@adapters/services';
import { CustomersRepositoryProtocol } from '@domain/protocols';
import { CustomerDto } from '@adapters/dtos';

@Injectable()
export class CustomersRepository implements CustomersRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<CustomerDto | null> {
    const isDeleted = false;
    return await this.prisma.customer.findUnique({
      where: { id, isDeleted },
      include: {
        favorites: {
          include: {
            reviews: true,
          }
        }
      },
    });
  }

  async getAll(skip?: number, take?: number): Promise<CustomerDto[]> {
    const isDeleted = false;
    return await this.prisma.customer.findMany({ 
      skip,
      take,
      where: { isDeleted },
      include: {
        favorites: {
          include: {
            reviews: true,
          }
        }
      },
    });
  }

  async create(data: CustomerDto): Promise<CustomerDto> {
    return await this.prisma.customer.create({
      data,
    });
  }

  async update(data: CustomerDto): Promise<CustomerDto> {
    const isDeleted = false;
    return await this.prisma.customer.update({
      data,
      where: { id: data.id, isDeleted },
    });
  }

  async delete(id: string): Promise<CustomerDto> {
    const isDeleted = false;
    return await this.prisma.customer.update({
      data: {
        isDeleted: true,
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
      where: { id, isDeleted },
    });
  }
}
