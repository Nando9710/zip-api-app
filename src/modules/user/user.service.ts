import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: unknown) {
    return await this.userRepository.save(createUserDto as DeepPartial<User>).then(res => res).catch(e => console.log(e));
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
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

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
