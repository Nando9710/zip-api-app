import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  path: string;

  @IsString()
  @IsNotEmpty({ "message": "UserId field cannot be empty" })
  @IsUUID()
  userId: string;
}
