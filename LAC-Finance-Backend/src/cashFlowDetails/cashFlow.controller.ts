import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Factcashflowdetails } from 'src/entities/cashFlowDetails.entity';
import { CashFlowService } from './cashFlow.service';

@Controller('cashFlow')
export class CashFlowController {
  constructor(private readonly cashFlowService: CashFlowService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.cashFlowService.findAll();
  }

  @Get('getCashFlowDetailsByRecordId')
  getCashFlowDetailsByRecordId(@Query('recordId') recordId: number) {
    return this.cashFlowService.getCashFlowDetailsByRecordId(recordId);
  }

  @Post('createCashFlow')
  createCashFlow(@Body() cashFlow: Factcashflowdetails) {
    return this.cashFlowService.createCashFlowDetail(cashFlow);
  }
}
