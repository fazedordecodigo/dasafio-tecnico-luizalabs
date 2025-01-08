import { Customer } from "@prisma/client";
import { ProductDto } from "../products/product.dto";

export type CustomerDto = Customer & { favorites: ProductDto[] };