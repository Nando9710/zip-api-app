import { IsString } from "class-validator";

export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  author: string;
}
