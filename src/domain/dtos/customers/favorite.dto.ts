import { IsNotEmpty, IsUUID } from "class-validator";

export class FavoriteDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}