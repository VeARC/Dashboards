import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortCoDetailsController } from './portfolioCompanyDetails.controller';
import { Dimportcodetails } from 'src/entities/portfolioCompanyDetails.entity';
import { PortCoDetailsService } from './portfolioCompanyDetails.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dimportcodetails])],
  controllers: [PortCoDetailsController],
  providers: [PortCoDetailsService],
  exports: [PortCoDetailsService],
})
export class PortCoDetailsModule {}
