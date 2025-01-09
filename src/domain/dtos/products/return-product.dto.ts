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
export class ReturnProductDto {
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
    reviews: Review[];
}
