import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomersServiceProtocol, Notifications } from '../Protocols/customers.service.protocol';
import { CustomersRepositoryProtocol } from '../Protocols/customers.repository.protocol';
import { CUSTOMER_REPOSITORY } from 'src/adapters/constants';
import { Customer } from 'src/ports/Domain/entities/customer.entity';
import { Result } from 'typescript-result';

@Injectable()
export class CustomersService implements CustomersServiceProtocol {
  constructor(@Inject(CUSTOMER_REPOSITORY) private readonly _repository: CustomersRepositoryProtocol) {}

  async getById(id: string): Promise<Result<Customer, Notifications[]>> {
    try {
      const customer = await this._repository.getById(id);
      if (!customer) {
        return Result.error([{ message:'Customer not found' }]);
      }
      return Result.ok(customer);
    } catch (error) {
      return Result.error([{ message: 'Error fetching customer' }]);
    }
  }

  async getAll(skip = 0, take = 10): Promise<Result<Customer[], Notifications[]>> {
    try {
      const customers = await this._repository.getAll(skip, take);
      return Result.ok(customers);
    } catch (error) {
      return Result.error([{ message:'Error fetching customers' }]);
    }
  }

  async create(data: CreateCustomerDto): Promise<Result<Customer, Notifications[]>> {
    try {
      const customer = new Customer(
        data.name,
        data.email
      );
      const result = await this._repository.create(customer);
      return Result.ok(result);
    } catch (error) {
      return Result.error([{ message: 'Error creating customer' }]);
    }
  }

  async update(id: string, data: UpdateCustomerDto): Promise<Result<void, Notifications[]>> {
    try {
      const customer = new Customer(
        data.name,
        data.email,
        id
      );
      const result = await this._repository.update(customer);
      if (!result) {
        return Result.error([{ message:'Customer not found' }]);
      }
      return Result.ok();
    } catch (error) {
      return Result.error([{ message:'Error updating customer' }]);
    }
  }

  async delete(id: string): Promise<Result<void, Notifications[]>> {
    try {
      await this._repository.delete(id);
      return Result.ok();
    } catch (error) {
      return Result.error([{ message:'Error deleting customer' }]);
    }
  }
}

