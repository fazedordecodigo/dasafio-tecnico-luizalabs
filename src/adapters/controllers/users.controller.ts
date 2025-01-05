import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Inject,
  Query,
} from '@nestjs/common';
import { Public, USER_SERVICE } from '@adapters/constants';
import { UsersServiceProtocol } from '@ports/application/protocols';
import { CreateUserDto, GetByEmailUserDto } from '@ports/application/dto';
import { Role } from '@ports/domain/entities/enums';
import { Roles } from '@adapters/decorators';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: UsersServiceProtocol,
  ) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Roles(Role.Admin)
  @Get()
  async getByEmail(@Query() email: GetByEmailUserDto) {
    const result = await this.usersService.getByEmail(email);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }
}
