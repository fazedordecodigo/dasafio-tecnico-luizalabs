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
} from '@nestjs/common';
import { UpdateCustomerDto, CreateCustomerDto } from '@domain/dtos';
import { CustomersServiceProtocol } from '@domain/protocols';
import { CUSTOMER_SERVICE } from '@adapters/constants';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject(CUSTOMER_SERVICE)
    private readonly customersService: CustomersServiceProtocol,
  ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const result = await this.customersService.create(createCustomerDto);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Get()
  async findAll() {
    const result = await this.customersService.getAll();
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.customersService.getById(id);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Patch(':id')
  async update(
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
  async remove(@Param('id') id: string) {
    const result = await this.customersService.delete(id);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }
}
