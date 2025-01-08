import { IsNumber, IsOptional } from "class-validator";

export class GetAllDto {
    @IsNumber()
    @IsOptional()
    public skip: number;
    @IsNumber()
    @IsOptional()
    public take: number;
}