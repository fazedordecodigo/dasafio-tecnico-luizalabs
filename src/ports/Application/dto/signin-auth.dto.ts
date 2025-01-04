import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignInAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}