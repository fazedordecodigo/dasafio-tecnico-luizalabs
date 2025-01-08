import { ProductDto } from "@adapters/dtos";

export interface ProductsRepositoryProtocol {
    getById(id: string): Promise<ProductDto | null>
    getAll(skip?: number, take?: number): Promise<ProductDto[]>
}