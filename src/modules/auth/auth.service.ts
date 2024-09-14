import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // console.log(user.user);
    const payload = {
      user: {
        id: user.user.id,
        email: user.user.email,
        name: user.user.name,
        created_at: user.user.created_at,
        updated_at: user.user.updated_at
      }
    };
    // console.log({payload});
    return {
      access_token: this.jwtService.sign(payload),
    };

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
