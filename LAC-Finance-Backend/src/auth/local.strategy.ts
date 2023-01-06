import { Injectable } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Users } from 'src/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<Users> {
    const user = await this.usersService.getUserByUserName(username);
    if (user === undefined || user === null) throw new UnauthorizedException();
    if (user !== undefined && user.password === password) return user;
    else {
      throw new UnauthorizedException();
    }
  }
}
