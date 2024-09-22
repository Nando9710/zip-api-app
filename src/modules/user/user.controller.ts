import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
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
  create(@Body() createUserDto: CreateUserDto, @Request() req: ExpressRequest) {
    return this.userService.create(createUserDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: ExpressRequest) {
    return this.userService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.userService.remove(id, req);
  }
}
