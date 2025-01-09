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
} from '@nestjs/common';
import {
  GetAllDto,
  FavoriteDto,
  ResponseCustomerDto,
  ResponseCustomerWithFavoriteDto,
} from '@domain/dtos';
import { CustomersServiceProtocol } from '@domain/protocols';
import { CUSTOMER_SERVICE } from '@adapters/constants';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CustomerDto } from '@domain/dtos';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject(CUSTOMER_SERVICE)
    private readonly customersService: CustomersServiceProtocol,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    isArray: false,
    type: ResponseCustomerDto,
  })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiBody({
    type: CustomerDto,
    required: true,
    description: 'The record to be created',
    isArray: false,
  })
  public async create(@Body() createCustomerDto: CustomerDto) {
    const result = await this.customersService.create(createCustomerDto);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Post(':id/favorites')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a favorite to a customer' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResponseCustomerWithFavoriteDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiParam({ name: 'id', required: true, description: 'The customer id' })
  @ApiBody({
    type: FavoriteDto,
    required: true,
    description: 'The favorite Id',
  })
  public async addFavorite(@Param('id') id: string, @Body() body: FavoriteDto) {
    const result = await this.customersService.addFavorite(id, body);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Patch(':id/favorites')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a favorite from a customer' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResponseCustomerWithFavoriteDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiParam({ name: 'id', required: true, description: 'The customer id' })
  @ApiBody({
    type: FavoriteDto,
    required: true,
    description: 'The favorite Id',
  })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiOkResponse({
    description: 'The records have been successfully retrieved.',
    isArray: true,
    type: ResponseCustomerDto,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'The number of records to skip',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'The number of records to take',
  })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  public async getAll(@Query() query: GetAllDto) {
    const result = await this.customersService.getAll(query);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a customer by id' })
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: ResponseCustomerWithFavoriteDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiParam({ name: 'id', required: true, description: 'The customer id' })
  public async getById(@Param('id') id: string) {
    const result = await this.customersService.getById(id);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a customer' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: ResponseCustomerDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiParam({ name: 'id', required: true, description: 'The customer id' })
  @ApiBody({
    type: CustomerDto,
    required: true,
    description: 'The record to be updated',
  })
  public async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: CustomerDto,
  ) {
    const result = await this.customersService.update(id, updateCustomerDto);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiParam({ name: 'id', required: true, description: 'The customer id' })
  public async delete(@Param('id') id: string) {
    const result = await this.customersService.delete(id);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }
}
