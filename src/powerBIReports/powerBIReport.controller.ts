import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PowerBIReport } from 'src/entities/powerBIReports.entity';
import { PowerBIReportService } from './powerBIReport.service';

@Controller('powerBIReport')
export class PowerBIReportController {
  constructor(private readonly powerBIReportService: PowerBIReportService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('generateAccessToken')
  generateAccessToken() {
    return this.powerBIReportService.generateAccessToken();
  }

  @Post('generateEmbedToken')
  generateEmbedToken(@Body() powerBIReport: PowerBIReport) {
    return this.powerBIReportService.generateEmbedToken(powerBIReport);
  }
}
