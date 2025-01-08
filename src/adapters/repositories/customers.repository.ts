import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@adapters/services';
import { CustomersRepositoryProtocol } from '@domain/protocols';
import { Customer } from '@domain/entities';
import { mapToDtoCreate, mapToEntity, mapToEntityFull } from '@adapters/mappers';

const isDeleted = false;

@Injectable()
export class CustomersRepository implements CustomersRepositoryProtocol {
  private readonly _logger = new Logger(CustomersRepository.name, {
    timestamp: true,
  });
  constructor(private readonly prisma: PrismaService) {}

  public async getByEmail(email: string): Promise<Customer | null> {
    try {
      this._logger.log(`Getting customer by email: ${email}`);
      const result = await this.prisma.customer.findUnique({
        where: { email, isDeleted },
      });
      if (!result) {
        this._logger.warn(`Customer not found`);
        return null;
      }
      this._logger.log(`Customer found: ${result.name}`);
      return mapToEntity(result);
    } catch (error) {
      this._logger.error(`Error fetching customer: ${error.message}`);
      throw error;
    }
  }

  public async addFavorites(
    id: string,
    favorites: string[],
  ): Promise<Customer> {
    try {
      this._logger.log(`Adding favorites to customer: ${id}`);
      const response = await this.prisma.customer.update({
        where: { id, isDeleted },
        data: {
          updatedAt: new Date(),
          favorites: {
            connect: favorites.map((favorite) => ({ id: favorite })),
          },
        },
        include: {
          favorites: {
            include: {
              reviews: true,
            },
          },
        },
      });
      this._logger.log(`Favorites added to customer: ${id}`);
      return mapToEntityFull(response);
    } catch (error) {
      this._logger.error(
        `Error adding favorites to customer: ${error.message}`,
      );
      throw error;
    }
  }

  public async removeFavorites(
    id: string,
    favorites: string[],
  ): Promise<Customer> {
    try {
      this._logger.log(`Removing favorites from customer: ${id}`);
      const response = await this.prisma.customer.update({
        where: { id, isDeleted },
        data: {
          updatedAt: new Date(),
          favorites: {
            disconnect: favorites.map((favorite) => ({ id: favorite })),
          },
        },
        include: {
          favorites: {
            include: {
              reviews: true,
            },
          },
        },
      });
      this._logger.log(`Favorites removed from customer: ${id}`);
      return mapToEntityFull(response);
    } catch (error) {
      this._logger.error(
        `Error removing favorites from customer: ${error.message}`,
      );
      throw error;
    }
  }

  public async getById(id: string): Promise<Customer | null> {
    try {
      this._logger.log(`Getting customer by id: ${id}`);
      const result = await this.prisma.customer.findUnique({
        where: { id, isDeleted },
        include: {
          favorites: {
            include: {
              reviews: true,
            },
          },
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
      const result = await this.prisma.customer.findMany({
        skip,
        take,
        where: { isDeleted },
      });
      this._logger.log(`Found ${result.length} customers`);
      if (result.length === 0) {
        return [];
      }
      return result.map((customer) => mapToEntity(customer));
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
      await this.prisma.customer.update({
        data: {
          name: data.name,
          email: data.email,
          updatedAt: new Date(),
        },
        where: { id: data.id, isDeleted },
      });
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