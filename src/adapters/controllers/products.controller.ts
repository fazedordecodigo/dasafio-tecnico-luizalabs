import { PRODUCT_SERVICE } from '@adapters/constants';
import { Controller, Get, Param, Inject, BadRequestException } from '@nestjs/common';
import { ProductsServiceProtocol } from '@domain/protocols';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsService: ProductsServiceProtocol) {}

  @Get()
  async getAll() {
    const result = await this.productsService.getAll();
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.productsService.getById(id);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }
}
