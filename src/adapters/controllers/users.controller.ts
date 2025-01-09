import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Inject,
  Query,
} from '@nestjs/common';
import { USER_SERVICE } from '@adapters/constants';
import { UsersServiceProtocol } from '@domain/protocols';
import { CreateUserDto, GetByEmailUserDto } from '@domain/dtos';
import { Role } from '@domain/entities/enums';
import { Public, Roles } from '@adapters/decorators';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: UsersServiceProtocol,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBody({ type: CreateUserDto, required: true, description: 'The record to be created' })
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get user by email' })
  @ApiOkResponse({ description: 'The record has been successfully found.', isArray: false, type: GetByEmailUserDto })
  @ApiQuery({ name: 'email', required: true, type: String, description: 'User email' })
  async getByEmail(@Query() email: GetByEmailUserDto) {
    const result = await this.usersService.getByEmail(email);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }
}
