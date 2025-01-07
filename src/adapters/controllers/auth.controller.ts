import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { SignInAuthDto } from '@domain/dtos';
import { AuthService } from '@adapters/services';
import { Public } from '@adapters/decorators';

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
