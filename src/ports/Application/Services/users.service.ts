import { Injectable } from '@nestjs/common';
import { UsersServiceProtocol } from '../Protocols/users.service.protocol';

export type User = any;

@Injectable()
export class UsersService implements UsersServiceProtocol {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
