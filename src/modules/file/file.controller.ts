import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, Req, Request } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploaded } from 'src/common/interfaces/file/file-uploaded';
import { Request as ExpressRequest } from 'express';

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
        new MaxFileSizeValidator({ maxSize: 5000000 }),
        // new FileTypeValidator({ fileType: 'image/jpeg' }),
      ],
    }),
  ) file: Express.Multer.File, @Req() req): Promise<unknown> {
    const { name, fileZip } = await this.fileService.convertFileToZip(file.originalname, file.buffer);
    const fileUpdated: FileUploaded = await this.fileService.uploadFileToSupabase(name, fileZip);

    const createFileDto: CreateFileDto = {
      ...req?.body,
      name: file.originalname,
      path: fileUpdated.data.path
    };
    return await this.fileService.create(createFileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: ExpressRequest) {
    return this.fileService.findAll(req);
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
  async remove(@Param('id') id: string, @Request() req: ExpressRequest) {
    await this.fileService.removeFileFromSupabase(id);

    return await this.fileService.remove(id, req);
  }
}