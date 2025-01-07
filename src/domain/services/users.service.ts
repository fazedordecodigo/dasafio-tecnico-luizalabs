import { Inject, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UsersRepositoryProtocol,
  UsersServiceProtocol,
} from '@domain/protocols';
import { USER_REPOSITORY } from '@adapters/constants';
import {
  CreateUserDto,
  GetByEmailUserDto,
  GetByEmailUserResultDto,
} from '@domain/dtos';
import { Result } from 'typescript-result';
import { User, Notification } from '@domain/entities';

@Injectable()
export class UsersService implements UsersServiceProtocol {
  private readonly USERS_RESVICE_CREATE = 'UsersService.create';
  private readonly USERS_RESVICE_GET_BY_EMAIL = 'UsersService.getByEmail';
  private readonly _logger = new Logger(UsersService.name, {
    timestamp: true,
  });

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _repository: UsersRepositoryProtocol,
  ) {}

  public async getByEmail(
    email: GetByEmailUserDto,
  ): Promise<Result<GetByEmailUserResultDto, Notification>> {
    const user = await this._repository.getByEmail(email.email);
    if (!user) {
      this._logger.warn(
        `User ${email.email} not found`,
        this.USERS_RESVICE_GET_BY_EMAIL,
      );
      return Result.error({ message: 'User not found' });
    }
    this._logger.log(
      `User ${email.email} found`,
      this.USERS_RESVICE_GET_BY_EMAIL,
    );
    return Result.ok({ email: user.email, role: user.role });
  }

  public async create(
    data: CreateUserDto,
  ): Promise<Result<void, Notification>> {
    this._logger.log(`Creating user ${data.email}`, this.USERS_RESVICE_CREATE);

    const user = await this.getByEmail({ email: data.email });
    if (user.isOk()) {
      this._logger.warn(
        `User ${data.email} already exists`,
        this.USERS_RESVICE_CREATE,
      );
      return Result.error({ message: 'User already exists' });
    }
    const password = await this.hashPassword(data.password);
    const newUser = new User(data.email, password, data.role);

    const result = await this._repository.create(newUser);
    if (!result) {
      this._logger.error(
        `Error creating user ${data.email}`,
        this.USERS_RESVICE_CREATE,
      );
      return Result.error({ message: 'Error creating user' });
    }
    this._logger.log(`User ${data.email} created`, this.USERS_RESVICE_CREATE);
    return Result.ok();
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
