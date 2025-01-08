import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@adapters/services';
import { ProductsRepositoryProtocol } from '@domain/protocols';
import { ProductDto } from '@adapters/dtos/products/product.dto';

@Injectable()
export class ProductsRepository implements ProductsRepositoryProtocol {
  private readonly _logger = new Logger(ProductsRepository.name, {
    timestamp: true,
  });

  constructor(private readonly prisma: PrismaService) {}

  public async getById(id: string): Promise<ProductDto | null> {
    try {
      const isDeleted = false;
      this._logger.log('Getting product by id', 'ProductsRepository.getById');
      return await this.prisma.product.findUnique({
        where: { id, isDeleted },
        include: {
          reviews: true,
        },
      });
    } catch (error) {
      this._logger.error(error, 'ProductsRepository.getById');
      throw error;
    }
  }

  public async getAll(skip?: number, take?: number): Promise<ProductDto[]> {
    try {
      const isDeleted = false;
      this._logger.log('Getting all products', 'ProductsRepository.getAll');
      return await this.prisma.product.findMany({
        skip,
        take,
        include: {
          reviews: true,
        },
        where: { isDeleted },
      });
    } catch (error) {
      this._logger.error(error, 'ProductsRepository.getAll');
      throw error;
    }
  }
}
