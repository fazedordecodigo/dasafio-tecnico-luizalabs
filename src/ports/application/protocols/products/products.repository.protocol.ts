import { ProductDto } from "@adapters/dtos/products/product.dto";
import { RepositoryProtocol } from "@ports/application/protocols";

export interface ProductsRepositoryProtocol extends RepositoryProtocol<ProductDto> {}