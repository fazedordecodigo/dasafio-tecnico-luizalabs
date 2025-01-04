import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Inject,
  Query,
} from '@nestjs/common';
import { Public, USER_SERVICE } from '../constants';
import { UsersServiceProtocol } from 'src/ports/Application/Protocols/users.service.protocol';
import { CreateUserDto } from 'src/ports/Application/dto/create-user.dto';
import { GetByEmailUserDto } from 'src/ports/Application/dto/get-by-email-user.dto';
import { Role } from 'src/ports/Domain/entities/enums/role.enum';
import { Roles } from '../decorators/roles.decorator';

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
