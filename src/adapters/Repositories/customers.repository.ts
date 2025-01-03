import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Services/prisma.service';
import { CustomersRepositoryProtocol } from 'src/ports/Application/Protocols/customers.repository.protocol';
import { Customer } from 'src/ports/Domain/entities/customer.entity';

@Injectable()
export class CustomersRepository implements CustomersRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<Customer | null> {
    return await this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async getAll(skip?: number, take?: number): Promise<Customer[]> {
    return await this.prisma.customer.findMany({ skip, take });
  }

  async create(data: Customer): Promise<Customer> {
    return await this.prisma.customer.create({
      data,
    });
  }

  async update(data: Customer): Promise<Customer> {
    return await this.prisma.customer.update({
      data,
      where: { id: data.id },
    });
  }

  async delete(id: string): Promise<Customer> {
    return await this.prisma.customer.delete({
      where: { id },
    });
  }
}
