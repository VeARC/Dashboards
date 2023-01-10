import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
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

  @Put('updateCashFlow/:id')
  updateCashFlow(
    @Param('id') id: number,
    @Body() cashFlow: Factcashflowdetails,
  ) {
    return this.cashFlowService.updateCashFlowDetail(id, cashFlow);
  }

  @Delete('deleteCashFlow/:id')
  deleteCashFlow(@Param('id') id: number) {
    return this.cashFlowService.deleteCashFlowDetail(id);
  }
}
