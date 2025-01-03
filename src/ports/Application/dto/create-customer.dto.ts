import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
