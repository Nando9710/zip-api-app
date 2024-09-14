import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Files } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor (
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
  ) {}
  async create(createFileDto: CreateFileDto) {
    return await this.filesRepository.save(createFileDto).then(res => res);
    // return 'This action adds a new file';
  }

  findAll(): Promise<Files[]> {
    return this.filesRepository.find()
    // return `This action returns all file`;
  }

  findOne(id: number): Promise<Files> {
    return this.filesRepository.findOne(id as FindOneOptions<Files>);
    // return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  // async update(id: number, data: object): Promise<Book | UpdateResult | undefined> {
  //   const book = await this.findOne(id).then(res => res);
  //   if (book) return await this.booksRepository.update(id, data).then(res => res);
  //   return;
  // }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
