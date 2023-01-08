import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Userdetails } from '../entities/users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Userdetails])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
