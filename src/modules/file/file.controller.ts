import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, Req } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploaded } from 'src/common/interfaces/file/file-uploaded';

@Controller('file')
export class FileController {
  constructor (private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 50000 }),
        // new FileTypeValidator({ fileType: 'image/jpeg' }),
      ],
    }),
  ) file: Express.Multer.File, @Req() req): Promise<unknown> {
    const fileUpdated: FileUploaded = await this.fileService.uploadFileToSupabase(file.originalname, file.buffer);

    const createFileDto: CreateFileDto = { ...req?.body, path: fileUpdated.data.path };
    return await this.fileService.create(createFileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.fileService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(id, updateFileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.fileService.removeFileFromSupabase(id);

    return await this.fileService.remove(id);
  }
}
