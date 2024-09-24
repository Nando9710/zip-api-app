import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Request } from 'express'

@Injectable()
export class AuthService {
  constructor (
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new BadRequestException(`User with email: ${email} not found`);

    const isSamePassword = await bcrypt.compare(pass, user.password);

    if (user && isSamePassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req: Request) {
    const { id, name, email } = req.user as Partial<User>;
    const payload = { id, name, email };

    const accessToken = await this.jwtService.sign(payload);
    return { ...payload, accessToken };
  }

  async register({ body }) {
    body.password = await bcrypt.hash(body.password, 10);
    body.created_at = new Date();
    const response = await this.usersService.create(body);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token)
  }
}
