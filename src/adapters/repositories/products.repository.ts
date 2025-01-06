import { Injectable } from '@nestjs/common';
import { PrismaService } from '@adapters/services';
import { ProductsRepositoryProtocol } from '@ports/application/protocols';
import { ProductDto } from '@adapters/dtos/products/product.dto';

@Injectable()
export class ProductsRepository implements ProductsRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<ProductDto | null> {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  async getAll(skip?: number, take?: number): Promise<ProductDto[]> {
    return await this.prisma.product.findMany({ skip, take });
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
