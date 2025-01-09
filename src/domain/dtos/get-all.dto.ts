import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetAllDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => {
        return Number(value);
    })
    public skip: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => {
        return Number(value);
    })
    public take: number;
}