import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dimshareclass } from 'src/entities/shareClass.entity';

@Injectable()
export class ShareClassService {
  constructor(
    @InjectRepository(Dimshareclass)
    private readonly shareClassRepository: Repository<Dimshareclass>,
  ) {}

  findAll() {
    return this.shareClassRepository.find();
  }
  async getShareClassById(shareClassId: number): Promise<Dimshareclass> {
    const shareClass = await this.shareClassRepository.findOne({
      where: { ShareClassId: shareClassId },
    });
    return shareClass;
  }

  createShareClass(shareClass: Dimshareclass): Promise<Dimshareclass> {
    const cashFlowDetail = this.shareClassRepository.create({
      ...shareClass,
    });
    return this.shareClassRepository.save(cashFlowDetail);
  }
}
