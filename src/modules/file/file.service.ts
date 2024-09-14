import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Files } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

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

  async findAll(): Promise<Files[]> {
    return await this.filesRepository.find()
  }

  async findOne(id: string): Promise<Files> {
    return await this.filesRepository.findOne(id as FindOneOptions<Files>);
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    return await this.filesRepository.update(id, updateFileDto).then(res => res);
  }

  async remove(id: string) {
    return await this.filesRepository.delete(id);
  }
}
