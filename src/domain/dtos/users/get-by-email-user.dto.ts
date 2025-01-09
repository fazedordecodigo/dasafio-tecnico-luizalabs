import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class GetByEmailUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}