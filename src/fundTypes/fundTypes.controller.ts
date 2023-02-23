import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FundTypesService } from './fundTypes.service';

@Controller('fundTypes')
export class FundTypesController {
  constructor(private readonly fundTypesService: FundTypesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.fundTypesService.findAll();
  }

  @Get('getFundTypeByFundId')
  getFundTypeByFundId(@Query('fundId') fundId: number) {
    return this.fundTypesService.getFundTypeByFundId(fundId);
  }
}
