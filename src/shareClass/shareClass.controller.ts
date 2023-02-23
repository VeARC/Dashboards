import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Dimshareclass } from 'src/entities/shareClass.entity';
import { ShareClassService } from './shareClass.service';

@Controller('shareClass')
export class ShareClassController {
  constructor(private readonly shareClassService: ShareClassService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.shareClassService.findAll();
  }

  @Get('getShareClassById')
  getShareClassById(@Query('shareClassId') shareClassId: number) {
    return this.shareClassService.getShareClassById(shareClassId);
  }

  @Post()
  createCashFlow(@Body() shareClass: Dimshareclass) {
    //console.log(shareClass);
    return this.shareClassService.createShareClass(shareClass);
  }
}
