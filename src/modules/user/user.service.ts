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

  findAll(): Promise<User[]> {
    return this.userRepository.find()
    // return `This action returns all file`;
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email }
    } as FindOneOptions<User>);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
