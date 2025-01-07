import { Entity } from "./entity";
import { Product } from "./product.entity";

export class Review extends Entity {
    constructor(
        public title: string,
        public content: string,
        public customer: string,
        public score: number,
        public product: Product,
        id?: string
    ) {
        super(id);
    }
}