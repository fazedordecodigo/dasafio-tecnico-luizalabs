import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { SignInAuthDto } from '@domain/dtos';
import { AuthService } from '@adapters/services';
import { Public } from '@adapters/decorators';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiCreatedResponse({ description: 'User logged in successfully' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  async signIn(@Body() signInDto: SignInAuthDto) {
    return await this.authService.signIn(signInDto);
  }
}
