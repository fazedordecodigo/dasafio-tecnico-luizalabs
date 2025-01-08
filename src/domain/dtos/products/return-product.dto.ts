import { Review } from "@domain/entities";

export interface ReturnProductDto {
    id: string;
    title: string;
    brand: string;
    price: number;
    image: string;
    reviews: {
        id: string;
        title: string;
        content: string;
        customer: string;
        score: number;
    }[];
}