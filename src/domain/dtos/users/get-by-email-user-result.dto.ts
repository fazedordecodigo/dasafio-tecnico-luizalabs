import { ApiProperty } from "@nestjs/swagger";

export class GetByEmailUserResultDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    role: string;
}