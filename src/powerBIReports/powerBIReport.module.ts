import { Module } from '@nestjs/common';
import { PowerBIReportController } from './powerBIReport.controller';
import { PowerBIReportService } from './powerBIReport.service';

@Module({
  imports: [],
  controllers: [PowerBIReportController],
  providers: [PowerBIReportService],
  exports: [PowerBIReportService],
})
export class PowerBIReportModule {}
