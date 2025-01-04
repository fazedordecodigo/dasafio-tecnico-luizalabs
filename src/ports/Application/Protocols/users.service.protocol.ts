import { Notification } from '@ports/Domain/entities';
import { Result } from 'typescript-result';
import { CreateUserDto, GetByEmailUserDto, GetByEmailUserResultDto } from '@ports/Application/dto';

export interface UsersServiceProtocol {
  getByEmail(
    email: GetByEmailUserDto,
  ): Promise<Result<GetByEmailUserResultDto, Notification>>;
  create(data: CreateUserDto): Promise<Result<void, Notification>>;
}
