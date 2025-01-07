import { Injectable } from '@nestjs/common';
import { PrismaService } from '@adapters/services';
import { CustomersRepositoryProtocol } from '@domain/protocols';
import { CustomerDto } from '@adapters/dtos';

@Injectable()
export class CustomersRepository implements CustomersRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<CustomerDto | null> {
    return await this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async getAll(skip?: number, take?: number): Promise<CustomerDto[]> {
    return await this.prisma.customer.findMany({ skip, take });
  }

  async create(data: CustomerDto): Promise<CustomerDto> {
    return await this.prisma.customer.create({
      data,
    });
  }

  async update(data: CustomerDto): Promise<CustomerDto> {
    return await this.prisma.customer.update({
      data,
      where: { id: data.id },
    });
  }

  async delete(id: string): Promise<CustomerDto> {
    return await this.prisma.customer.delete({
      where: { id },
    });
  }
}
