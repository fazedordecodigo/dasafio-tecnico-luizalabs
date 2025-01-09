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
import { GetAllDto, ReturnProductDto } from '@domain/dtos';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Product } from '@domain/entities';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productsService: ProductsServiceProtocol,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({
    type: ReturnProductDto,
    isArray: true,
  })
  @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Number of records to skip' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'Number of records to take'})
  public async getAll(@Query() query: GetAllDto) {
    const result = await this.productsService.getAll(query);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get product by id' })
  @ApiOkResponse({
    type: ReturnProductDto,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiParam({ name: 'id', required: true, type: String, description: 'Product id' })
  public async getById(@Param('id') id: string) {
    const result = await this.productsService.getById(id);
    if (result.isOk()) return result.value;

    throw new BadRequestException('BadRequest', {
      cause: new Error(),
      description: result.error.message,
    });
  }
}
