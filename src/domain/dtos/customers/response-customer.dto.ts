import { ApiProperty } from "@nestjs/swagger";

export class ResponseCustomerDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;
}