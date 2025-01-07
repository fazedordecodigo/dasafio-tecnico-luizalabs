import { Notification } from '@domain/entities';
import { Result } from 'typescript-result';
import { CreateUserDto, GetByEmailUserDto, GetByEmailUserResultDto } from '@domain/dtos';

export interface UsersServiceProtocol {
  getByEmail(
    email: GetByEmailUserDto,
  ): Promise<Result<GetByEmailUserResultDto, Notification>>;
  create(data: CreateUserDto): Promise<Result<void, Notification>>;
}
