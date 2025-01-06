import { ReturnProductDto } from '@ports/application/dto';
import { Notification } from '@ports/domain/entities';
import { Result } from 'typescript-result';

export interface ProductsServiceProtocol {
  getById(id: string): Promise<Result<ReturnProductDto, Notification>>;
  getAll(
    skip?: number,
    take?: number,
  ): Promise<Result<ReturnProductDto[], Notification>>;
}
