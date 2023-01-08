import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userdetails } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Userdetails)
    private readonly usersRepository: Repository<Userdetails>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }
  async getUserByUserName(userName: string): Promise<Userdetails> {
    const user = await this.usersRepository.findOne({
      where: { UserName: userName },
    });
    return user;
  }
}
