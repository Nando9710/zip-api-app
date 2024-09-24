import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Request() req: ExpressRequest) {
    return await this.userService.create(createUserDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: ExpressRequest) {
    return await this.userService.findAll(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: ExpressRequest) {
    const user = await this.userService.findOneById(id);

    if (user.files.length > 0) {
      throw new BadRequestException('No se puede eliminar un usuario porque tiene archivos asociados.');
    }

    return this.userService.remove(id, req);
  }
}
