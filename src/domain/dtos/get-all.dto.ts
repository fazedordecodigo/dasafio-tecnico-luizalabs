import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetAllDto {
    @ApiPropertyOptional({
        type: Number,
        description: 'This is an optional property',
      })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => {
        return Number(value);
    })
    public skip: number;

    @ApiPropertyOptional({
        type: Number,
        description: 'This is an optional property',
      })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => {
        return Number(value);
    })
    public take: number;
}