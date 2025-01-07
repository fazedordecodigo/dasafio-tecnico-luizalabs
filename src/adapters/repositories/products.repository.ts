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

  async getById(id: string): Promise<ProductDto | null> {
    try {
      return await this.prisma.product.findUnique({
        where: { id },
      });
    } catch (error) {
      this._logger.error(error, 'ProductsRepository.getById');
      throw error;
    }
  }

  async getAll(skip?: number, take?: number): Promise<ProductDto[]> {
    try {
      this._logger.log('Getting all products', 'ProductsRepository.getAll');
      return await this.prisma.product.findMany({ skip, take });
    } catch (error) {
      this._logger.error(error, 'ProductsRepository.getAll');
      throw error;
    }
  }

  async create(data: ProductDto): Promise<ProductDto> {
    return await this.prisma.product.create({
      data,
    });
  }

  async update(data: ProductDto): Promise<ProductDto> {
    return await this.prisma.product.update({
      data,
      where: { id: data.id },
    });
  }

  async delete(id: string): Promise<ProductDto> {
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
