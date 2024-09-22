import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { IsString } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @IsString()
  description: string;
}
