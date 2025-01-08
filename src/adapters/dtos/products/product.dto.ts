import { Product, Review } from "@prisma/client";

export type ProductDto = Product & { reviews: Review[] };