import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PortCoDetailsService } from './portfolioCompanyDetails.service';

@Controller('portCoDetails')
export class PortCoDetailsController {
  constructor(private readonly portCoDetailsService: PortCoDetailsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.portCoDetailsService.findAll();
  }

  @Get('getPortCoDetailsById')
  getPortCoDetailsById(@Query('portCoId') portCoId: number) {
    return this.portCoDetailsService.getPortCoDetailsById(portCoId);
  }
}
