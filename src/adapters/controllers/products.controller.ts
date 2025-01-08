import { PRODUCT_SERVICE } from '@adapters/constants';
import {
  Controller,
  Get,
  Param,
  Inject,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ProductsServiceProtocol } from '@domain/protocols';
import { GetAllDto } from '@domain/dtos';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productsService: ProductsServiceProtocol,
  ) {}

  @Get()
  public async getAll(@Query() query: GetAllDto) {
    const result = await this.productsService.getAll(query);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    const result = await this.productsService.getById(id);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }
}
