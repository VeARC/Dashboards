import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashFlowController } from './cashFlow.controller';
import { Factcashflowdetails } from 'src/entities/cashFlowDetails.entity';
import { CashFlowService } from './cashFlow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Factcashflowdetails])],
  controllers: [CashFlowController],
  providers: [CashFlowService],
  exports: [CashFlowService],
})
export class CashFlowModule {}
