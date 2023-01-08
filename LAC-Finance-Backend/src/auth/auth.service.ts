import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Userdetails } from 'src/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: Userdetails): string {
    return this.jwtService.sign(payload);
  }
}
