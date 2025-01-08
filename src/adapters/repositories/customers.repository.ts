import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@adapters/services';
import { CustomersRepositoryProtocol } from '@domain/protocols';
import { Customer } from '@domain/entities';
import { mapToDtoCreate, mapToEntityFull } from '@adapters/mappers';

@Injectable()
export class CustomersRepository implements CustomersRepositoryProtocol {
  private readonly _logger = new Logger(CustomersRepository.name, {
    timestamp: true,
  });
  constructor(private readonly prisma: PrismaService) { }

  public async getById(id: string): Promise<Customer | null> {
    try {
      this._logger.log(`Getting customer by id: ${id}`);
      const isDeleted = false;
      const result = await this.prisma.customer.findUnique({
        where: { id, isDeleted },
        include: {
          favorites: {
            include: {
              reviews: true,
            }
          }
        },
      });
      if (!result) {
        this._logger.warn(`Customer not found`);
        return null;
      }
      this._logger.log(`Customer found: ${result.name}`);
      return mapToEntityFull(result);
    } catch (error) {
      this._logger.error(`Error fetching customer: ${error.message}`);
      throw error;
    }
  }

  public async getAll(skip?: number, take?: number): Promise<Customer[]> {
    try {
      this._logger.log(`Getting all customers`);
      const isDeleted = false;
      const result = await this.prisma.customer.findMany({
        skip,
        take,
        where: { isDeleted }
      });
      this._logger.log(`Found ${result.length} customers`);
      if (result.length === 0) {
        return [];
      }
      return result.map(customer => (
        new Customer(customer.name, customer.email, customer.id)
      ))
    } catch (error) {
      this._logger.error(`Error fetching customers: ${error.message}`);
      throw error;
    }
  }
  public async create(data: Customer): Promise<Customer> {
    try {
      this._logger.log(`Creating customer: ${data.name}`);
      await this.prisma.customer.create(mapToDtoCreate(data));
      this._logger.log(`Customer created: ${data.name}`);
      return data;

    } catch (error) {
      this._logger.error(`Error creating customer: ${error.message}`);
      throw error;
    }
  }

  public async update(data: Customer): Promise<Customer> {
    try {
      this._logger.log(`Updating customer: ${data.name}`);
      const isDeleted = false;
      await this.prisma.customer.update({
        data: {
          name: data.name,
          email: data.email,
          updatedAt: new Date(),
        },
        where: { id: data.id, isDeleted },
      })
      this._logger.log(`Customer updated: ${data.name}`);
      return data;
    } catch (error) {
      this._logger.error(`Error updating customer: ${error.message}`);
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      this._logger.log(`Deleting customer: ${id}`);
      const isDeleted = false;
      await this.prisma.customer.update({
        data: {
          isDeleted: true,
          updatedAt: new Date(),
          deletedAt: new Date(),
        },
        where: { id, isDeleted },
      });
      this._logger.log(`Customer deleted: ${id}`);

    } catch (error) {
      this._logger.error(`Error deleting customer: ${error.message}`);
      throw error;
    }
  }
}
