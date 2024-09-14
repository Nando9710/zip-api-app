import { IsString, IsUUID } from "class-validator";

export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsUUID()
  userId: string;
}
