import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Files } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, FindManyOptions } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FileUploaded } from 'src/common/interfaces/file/file-uploaded';
import { SUPABASE_CONFIG } from 'supabase.config';
import { Request } from 'express'
import AdmZip from 'adm-zip';

@Injectable()
export class FileService {
  constructor (
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createFileDto: CreateFileDto) {
    const user = await this.userRepository.findOneBy({ id: createFileDto.userId });

    if (!user) throw new NotFoundException(`User with id: ${createFileDto.userId} not found`);

    return await this.filesRepository.save({ ...createFileDto, user }).then(res => res);
  }

  async uploadFileToSupabase(fileName: string, file: Buffer): Promise<FileUploaded> {
    const fileUploaded: FileUploaded = await SUPABASE_CONFIG.storage.from("zip-app")
      .upload(fileName, file, {
        upsert: true
      })

    return fileUploaded
  }

  async convertFileToZip(fileName: string, file: Buffer) {
    const admZip = new AdmZip();

    await admZip.addFile(fileName, file, "file converted");

    const zipFileName = `${fileName.split('.').slice(0, -1).join('.')}.zip`;

    return { name: zipFileName, fileZip: admZip.toBuffer() };
  }

  async findAll(req: Request): Promise<Files[]> {
    const user = req.user as { payload: Partial<User> };
    return await this.filesRepository.find({
      where: { user: { id: user?.payload?.id } },
    } as FindManyOptions<Files>);
  }

  async findOne(id: string): Promise<Files> {
    return await this.filesRepository.findOne({
      where: { id },
    } as FindOneOptions<Files>);
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    return await this.filesRepository.update(id, updateFileDto).then(res => res);
  }

  async remove(id: string) {
    return await this.filesRepository.delete(id);
  }

  async removeFileFromSupabase(id: string): Promise<any> {
    const fileToRemove = await this.findOne(id);

    const fileDeleted = await SUPABASE_CONFIG.storage.from("zip-app").remove([fileToRemove.path])

    if (!fileDeleted?.data || fileDeleted?.error) throw new BadRequestException(`Error from SUPABASE deleting the file`);

    return fileDeleted;
  }
}
