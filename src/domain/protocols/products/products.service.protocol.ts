import { GetAllProductsDto, ReturnProductDto } from '@domain/dtos';
import { Notification } from '@domain/entities';
import { Result } from 'typescript-result';

export interface ProductsServiceProtocol {
  getById(id: string): Promise<Result<ReturnProductDto, Notification>>;
  getAll(dot: GetAllProductsDto): Promise<Result<ReturnProductDto[], Notification>>;
}
