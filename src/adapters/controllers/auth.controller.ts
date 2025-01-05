import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '@adapters/constants';
import { SignInAuthDto } from '@ports/application/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInAuthDto) {
    return await this.authService.signIn(signInDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
