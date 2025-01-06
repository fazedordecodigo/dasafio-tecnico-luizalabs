import {
  CreateProductDto,
  ReturnProductDto,
  UpdateProductDto,
} from '@ports/application/dto';
import { Notification } from '@ports/domain/entities';
import { Result } from 'typescript-result';

export interface ProductsServiceProtocol {
  create(
    data: CreateProductDto,
  ): Promise<Result<ReturnProductDto, Notification>>;
  update(
    data: UpdateProductDto,
  ): Promise<Result<ReturnProductDto, Notification>>;
  delete(id: string): Promise<Result<void, Notification>>;
  getById(id: string): Promise<Result<ReturnProductDto, Notification>>;
  getAll(
    skip?: number,
    take?: number,
  ): Promise<Result<ReturnProductDto[], Notification>>;
}
