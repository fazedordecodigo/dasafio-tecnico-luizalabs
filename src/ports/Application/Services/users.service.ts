import * as bcrypt from 'bcrypt';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { UsersServiceProtocol } from '../Protocols/users.service.protocol';
import { User } from 'src/ports/Domain/entities/user.entity';
import { Notification } from 'src/ports/Domain/entities/notification.entity';
import { Result } from 'typescript-result';
import { CreateUserDto } from '../dto/create-user.dto';
import { USER_REPOSITORY } from 'src/adapters/constants';
import { UsersRepositoryProtocol } from '../Protocols/users.repository.protocol';
import { GetByEmailUserDto } from '../dto/get-by-email-user.dto';
import { GetByEmailUserResultDto } from '../dto/get-by-email-user-result.dto';

@Injectable()
export class UsersService implements UsersServiceProtocol {
  constructor(
    @Inject(USER_REPOSITORY) private readonly _repository: UsersRepositoryProtocol,
    private readonly _logger = new Logger(UsersService.name, { timestamp: true })
  ) {}

  async getByEmail(email: GetByEmailUserDto): Promise<Result<GetByEmailUserResultDto, Notification>> {
    const user = await this._repository.getByEmail(email.email);
    if (!user) {
      return Result.error({message: 'User not found'});
    }
    return Result.ok({ email: user.email, role: user.role });
  }

  async create(data: CreateUserDto): Promise<Result<void, Notification>> {
    const user = await this.getByEmail({ email: data.email });
    if (user.isOk()) {
      return Result.error({message: 'User already exists'});
    }
    const password = await this.hashPassword(data.password);
    const newUser = new User(
      data.email,
      password,
      data.role
    );

    const result = await this._repository.create(newUser);
    if (!result) {
      return Result.error({message: 'Error creating user'});
    }
    return Result.ok();
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
