import { IsNotEmpty, IsUUID } from "class-validator";

export class FavoritesDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}