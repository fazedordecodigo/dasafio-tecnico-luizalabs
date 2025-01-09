import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class FavoriteDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'The id of the favorite',
  })
  id: string;
}