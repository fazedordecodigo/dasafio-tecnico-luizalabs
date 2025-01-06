import { PRODUCT_REPOSITORY } from '@adapters/constants';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateProductDto,
  ReturnProductDto,
  UpdateProductDto,
} from '@ports/application/dto';
import {
  ProductsRepositoryProtocol,
  ProductsServiceProtocol,
} from '@ports/application/protocols';
import { Notification, Product } from '@ports/domain/entities';
import { Result } from 'typescript-result';

@Injectable()
export class ProductsService implements ProductsServiceProtocol {
  private readonly _logger = new Logger(ProductsService.name, {
    timestamp: true,
  });
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productsRepository: ProductsRepositoryProtocol,
  ) {}

  public async create(
    data: CreateProductDto,
  ): Promise<Result<ReturnProductDto, Notification>> {
    this._logger.log(`Creating product: ${data.title}`);
    const productExists = await this.getByTitle(data.title);
    if (productExists.isOk()) {
      this._logger.warn(`Product already exists`);
      return Result.error({ message: 'Product already exists' });
    }
    const product = new Product(
      data.title,
      data.brand,
      data.price,
      data.image,
      data.reviewScore,
    );
    const result = await this.productsRepository.create(product);
    if (!result) {
      this._logger.error('Error creating product');
      return Result.error({ message: 'Error creating product' });
    }
    this._logger.log(`Product created: ${product.title}`);
    return Result.ok({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      image: product.image,
      reviewScore: product.reviewScore,
    });
  }
  update(
    data: UpdateProductDto,
  ): Promise<Result<ReturnProductDto, Notification>> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Result<void, Notification>> {
    throw new Error('Method not implemented.');
  }
  public async getById(id: string): Promise<Result<ReturnProductDto, Notification>> {
    this._logger.log(`Getting product by id: ${id}`);
    const product = await this.productsRepository.getById(id);
    if (!product) {
      this._logger.warn(`Product not found`);
      return Result.error({ message: 'Product not found' });
    }
    this._logger.log(`Product found: ${product.title}`);
    return Result.ok({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      image: product.image,
      reviewScore: product.reviewScore,
    });
  }
  getAll(
    skip?: number,
    take?: number,
  ): Promise<Result<ReturnProductDto[], Notification>> {
    throw new Error('Method not implemented.');
  }

  public async getByTitle(title: string): Promise<Result<ReturnProductDto, Notification>> {
    throw new Error('Method not implemented.');
  }
}
