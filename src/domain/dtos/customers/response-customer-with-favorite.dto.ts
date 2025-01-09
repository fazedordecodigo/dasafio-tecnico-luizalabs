import { ApiProperty } from "@nestjs/swagger";

export class Review {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    content: string;
    @ApiProperty()
    customer: string;
    @ApiProperty()
    score: number;
}
export class Product {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    brand: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    image: string;
    @ApiProperty()
    averageScore: number;
    @ApiProperty()
    quantityOfReviews: number;
    @ApiProperty({isArray: true, type: Review })
    reviews: Review[];
}
export class ResponseCustomerWithFavoriteDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    quantityOfFavorites: number;
    @ApiProperty({isArray: true, type: Product })
    favorites: Product[];
}
