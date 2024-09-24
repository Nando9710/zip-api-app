import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Request } from 'express'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto, req?: Request) {
    const id = (req.user as { payload: Partial<User> })?.payload?.id;
    const parent = await this.userRepository.findOneBy({ id });

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.userRepository.save({ ...createUserDto as DeepPartial<User>, parent }).then(res => res).catch(e => console.log(e));
  }

  async findAll(req?: Request): Promise<User[]> {
    return await this.userRepository.find({
      where: { parent: { id: (req.user as { payload: Partial<User> })?.payload?.id } },
    })
  }

  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['files']
    } as FindOneOptions<User>);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email }
    } as FindOneOptions<User>);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto).then(res => res);
  }

  async remove(id: string, req?: Request) {
    await this.userRepository.delete(id)
    return await this.findAll(req);
  }
}
