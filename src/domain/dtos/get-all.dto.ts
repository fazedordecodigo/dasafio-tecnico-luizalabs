import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetAllDto {
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => {
        return Number(value);
    })
    public skip: number;
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => {
        return Number(value);
    })
    public take: number;
}