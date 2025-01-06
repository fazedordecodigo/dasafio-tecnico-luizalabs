import { PRODUCT_SERVICE } from '@adapters/constants';
import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ProductsServiceProtocol } from '@ports/application/protocols';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsService: ProductsServiceProtocol) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }
}
