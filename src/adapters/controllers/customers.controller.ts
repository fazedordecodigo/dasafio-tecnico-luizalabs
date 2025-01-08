import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Inject,
  Query,
  Put,
} from '@nestjs/common';
import {
  UpdateCustomerDto,
  CreateCustomerDto,
  GetAllDto,
  FavoriteDto,
} from '@domain/dtos';
import { CustomersServiceProtocol } from '@domain/protocols';
import { CUSTOMER_SERVICE } from '@adapters/constants';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject(CUSTOMER_SERVICE)
    private readonly customersService: CustomersServiceProtocol,
  ) {}

  @Post()
  public async create(@Body() createCustomerDto: CreateCustomerDto) {
    const result = await this.customersService.create(createCustomerDto);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Post(':id/favorites')
  public async addFavorite(@Param('id') id: string, @Body() body: FavoriteDto) {
    const result = await this.customersService.addFavorite(id, body);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Put(':id/favorites')
  public async removeFavorite(
    @Param('id') id: string,
    @Body() body: FavoriteDto,
  ) {
    const result = await this.customersService.removeFavorite(id, body);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Get()
  public async getAll(@Query() query: GetAllDto) {
    const result = await this.customersService.getAll(query);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    const result = await this.customersService.getById(id);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const result = await this.customersService.update(id, updateCustomerDto);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const result = await this.customersService.delete(id);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }
}
