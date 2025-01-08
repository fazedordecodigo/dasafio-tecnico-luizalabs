import { IsNotEmpty, IsUUID } from "class-validator";

export class AddFavoritesDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}