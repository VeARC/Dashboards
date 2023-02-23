import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareClassController } from './shareClass.controller';
import { Dimshareclass } from 'src/entities/shareClass.entity';
import { ShareClassService } from './shareClass.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dimshareclass])],
  controllers: [ShareClassController],
  providers: [ShareClassService],
  exports: [ShareClassService],
})
export class ShareClassModule {}
