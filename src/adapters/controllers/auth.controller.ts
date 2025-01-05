import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from '@adapters/constants';
import { SignInAuthDto } from '@ports/application/dto';
import { AuthService } from '@adapters/services';

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
