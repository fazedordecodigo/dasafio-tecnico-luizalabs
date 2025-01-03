import { Injectable } from '@nestjs/common';
import { UsersServiceProtocol } from '../Protocols/users.service.protocol';
import { User } from 'src/ports/Domain/entities/user.entity';

@Injectable()
export class UsersService implements UsersServiceProtocol {
  async findOne(username: string): Promise<User | undefined> {
    return undefined;
  }
}
