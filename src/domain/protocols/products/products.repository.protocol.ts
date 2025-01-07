import { ProductDto } from "@adapters/dtos/products/product.dto";
import { RepositoryProtocol } from "@domain/protocols";

export interface ProductsRepositoryProtocol extends RepositoryProtocol<ProductDto> {}