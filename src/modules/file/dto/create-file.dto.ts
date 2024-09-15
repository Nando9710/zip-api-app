import { IsString, IsUUID } from "class-validator";

export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  path: string;

  @IsString()
  @IsUUID()
  userId: string;
}
