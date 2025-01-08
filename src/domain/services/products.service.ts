import { PRODUCT_REPOSITORY } from '@adapters/constants';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetAllProductsDto, ReturnProductDto } from '@domain/dtos';
import {
  ProductsRepositoryProtocol,
  ProductsServiceProtocol,
} from '@domain/protocols';
import { Notification } from '@domain/entities';
import { Result } from 'typescript-result';

@Injectable()
export class ProductsService implements ProductsServiceProtocol {
  private readonly _logger = new Logger(ProductsService.name, {
    timestamp: true,
  });
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productsRepository: ProductsRepositoryProtocol,
  ) { }

  public async getById(
    id: string,
  ): Promise<Result<ReturnProductDto, Notification>> {
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
      reviews: product.reviews.map((review) => ({
        id: review.id,
        title: review.title,
        content: review.content,
        customer: review.customer,
        score: review.score,
      })),
    });
  }
  public async getAll(dto: GetAllProductsDto): Promise<Result<ReturnProductDto[], Notification>> {
    this._logger.log(`Getting all products`);
    const { skip, take } = dto;
    const products = await this.productsRepository.getAll(skip, take);
    this._logger.log(`Products found: ${products.length}`);
    return Result.ok(
      products.map((product) => ({
        id: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        image: product.image,
        reviews: product.reviews.map((review) => ({
          id: review.id,
          title: review.title,
          content: review.content,
          customer: review.customer,
          score: review.score,
        })),
      })),
    );
  }
}
