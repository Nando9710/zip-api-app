import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { IsString } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
