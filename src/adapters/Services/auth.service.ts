import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServiceProtocol } from 'src/ports/Application/Protocols/users.service.protocol';
import { USER_SERVICE } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: UsersServiceProtocol,
    private readonly jwtService: JwtService
) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
