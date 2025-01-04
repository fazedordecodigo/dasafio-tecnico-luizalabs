import { IsEmail, IsIn, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
    @IsNotEmpty()
    @IsIn(["ADMIN", "USER"])
    role: "ADMIN" | "USER";
}