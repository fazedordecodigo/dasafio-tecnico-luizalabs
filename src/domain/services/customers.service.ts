import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  FavoriteDto,
  CreateCustomerDto,
  GetAllDto,
  ResponseCustomerDto,
  ResponseCustomerWithFavoriteDto,
  UpdateCustomerDto,
} from '@domain/dtos';
import {
  CustomersRepositoryProtocol,
  CustomersServiceProtocol,
  ProductsRepositoryProtocol,
} from '@domain/protocols';
import { CUSTOMER_REPOSITORY, PRODUCT_REPOSITORY } from '@adapters/constants';
import { Customer, Notification } from '@domain/entities';
import { Result } from 'typescript-result';
import { mapToDto } from '@domain/mappers';

@Injectable()
export class CustomersService implements CustomersServiceProtocol {
  private readonly _logger = new Logger(CustomersService.name, {
    timestamp: true,
  });
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly _repository: CustomersRepositoryProtocol,
    @Inject(PRODUCT_REPOSITORY)
    private readonly _productRepository: ProductsRepositoryProtocol,
  ) {}

  public async getByEmail(
    email: string,
  ): Promise<Result<ResponseCustomerDto, Notification>> {
    try {
      this._logger.log(`Getting customer by email: ${email}`);
      const customer = await this._repository.getByEmail(email);
      if (!customer) {
        this._logger.warn(`Customer not found`);
        return Result.error({ message: 'Customer not found' });
      }
      this._logger.log(`Customer found: ${customer.name}`);
      return Result.ok({
        id: customer.id,
        name: customer.name,
        email: customer.email,
      });
    } catch (error) {
      this._logger.error(`Error fetching customer: ${error.message}`);
      return Result.error({ message: 'Error fetching customer' });
    }
  }

  public async removeFavorite(
    id: string,
    favorite: FavoriteDto,
  ): Promise<Result<ResponseCustomerWithFavoriteDto, Notification>> {
    try {
      this._logger.log(`Removing favorites from customer: ${id}`);
      const customer = await this._repository.getById(id);
      if (!customer) {
        return Result.error({ message: 'Customer not found' });
      }
      const productExistes = await this._productRepository.getById(favorite.id);
      const favoriteExistes = customer.favoriteExists(favorite.id);

      if (!productExistes) {
        return Result.error({ message: 'Product not exists' });
      }

      if (!favoriteExistes) {
        return Result.error({ message: 'Product not exists in favorites' });
      }

      const result = await this._repository.removeFavorite(customer.id, favorite.id);
      return Result.ok(mapToDto(result));
    } catch (error) {
      return Result.error({ message: 'Error removing favorites' });
    }
  }

  public async getById(
    id: string,
  ): Promise<Result<ResponseCustomerWithFavoriteDto, Notification>> {
    try {
      this._logger.log(`Getting customer by id: ${id}`);
      const customer = await this._repository.getById(id);
      if (!customer) {
        this._logger.warn(`Customer not found`);
        return Result.error({ message: 'Customer not found' });
      }
      this._logger.log(`Customer found: ${customer.name}`);
      return Result.ok(mapToDto(customer));
    } catch (error) {
      this._logger.error(`Error fetching customer: ${error.message}`);
      return Result.error({ message: 'Error fetching customer' });
    }
  }

  public async getAll(
    payload: GetAllDto,
  ): Promise<Result<ResponseCustomerDto[], Notification>> {
    try {
      const { skip, take } = payload;
      const customers = await this._repository.getAll(skip, take);
      return Result.ok(
        customers.map((customer) => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
        })),
      );
    } catch (error) {
      return Result.error({ message: 'Error fetching customers' });
    }
  }

  public async create(
    data: CreateCustomerDto,
  ): Promise<Result<ResponseCustomerDto, Notification>> {
    try {
      const customer = new Customer(data.name, data.email);
      const customerExists = await this.getByEmail(customer.email);
      if (customerExists.isOk()) {
        return Result.error({ message: 'Customer already exists' });
      }
      const result = await this._repository.create(customer);
      return Result.ok({
        id: result.id,
        name: result.name,
        email: result.email,
      });
    } catch (error) {
      return Result.error({ message: 'Error creating customer' });
    }
  }

  public async addFavorite(
    id: string,
    favorite: FavoriteDto,
  ): Promise<Result<ResponseCustomerWithFavoriteDto, Notification>> {
    try {
      const customer = await this._repository.getById(id);
      if (!customer) {
        return Result.error({ message: 'Customer not found' });
      }

      const productExistes = await this._productRepository.getById(favorite.id);
      const favoriteExistes = customer.favoriteExists(favorite.id);

      if (!productExistes) {
        return Result.error({ message: 'Product not exists' });
      }

      if (favoriteExistes) {
        return Result.error({ message: 'Product already exists in favorites' });
      }

      const result = await this._repository.addFavorite(customer.id, favorite.id);
      return Result.ok(mapToDto(result));
    } catch (error) {
      return Result.error({ message: 'Error adding favorites' });
    }
  }

  public async update(
    id: string,
    data: UpdateCustomerDto,
  ): Promise<Result<ResponseCustomerDto, Notification>> {
    try {
      const customer = new Customer(data.name, data.email, id);
      const result = await this._repository.update(customer);
      if (!result) {
        return Result.error({ message: 'Customer not found' });
      }
      return Result.ok(mapToDto(result));
    } catch (error) {
      return Result.error({ message: 'Error updating customer' });
    }
  }

  public async delete(id: string): Promise<Result<void, Notification>> {
    try {
      const customerExists = await this.getById(id);
      if (customerExists.isError()) {
        return Result.error({ message: 'Customer not exists' });
      }
      await this._repository.delete(id);
      return Result.ok();
    } catch (error) {
      return Result.error({ message: 'Error deleting customer' });
    }
  }
}
