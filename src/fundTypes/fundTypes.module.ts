import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundTypesController } from './fundTypes.controller';
import { Dimfundtypes } from 'src/entities/fundTypes.entity';
import { FundTypesService } from './fundTypes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dimfundtypes])],
  controllers: [FundTypesController],
  providers: [FundTypesService],
  exports: [FundTypesService],
})
export class FundTypesModule {}
