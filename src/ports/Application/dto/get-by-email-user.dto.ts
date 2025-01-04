import { IsEmail, IsNotEmpty } from "class-validator";

export class GetByEmailUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}