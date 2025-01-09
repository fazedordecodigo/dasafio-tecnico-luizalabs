import { Result } from 'typescript-result';
import {
  FavoriteDto,
  GetAllDto,
  ResponseCustomerDto,
  ResponseCustomerWithFavoriteDto,
  CustomerDto,
} from '@domain/dtos';
import { Notification } from '@domain/entities';

export interface CustomersServiceProtocol {
  getById(
    id: string,
  ): Promise<Result<ResponseCustomerWithFavoriteDto, Notification>>;
  getAll(
    payload: GetAllDto,
  ): Promise<Result<ResponseCustomerDto[], Notification>>;
  getByEmail(email: string): Promise<Result<ResponseCustomerDto, Notification>>;
  create(
    data: CustomerDto,
  ): Promise<Result<ResponseCustomerDto, Notification>>;
  addFavorite(
    id: string,
    favorite: FavoriteDto,
  ): Promise<Result<ResponseCustomerWithFavoriteDto, Notification>>;
  removeFavorite(
    id: string,
    favorite: FavoriteDto,
  ): Promise<Result<ResponseCustomerWithFavoriteDto, Notification>>;
  update(
    id: string,
    data: CustomerDto,
  ): Promise<Result<ResponseCustomerDto, Notification>>;
  delete(id: string): Promise<Result<void, Notification>>;
}
