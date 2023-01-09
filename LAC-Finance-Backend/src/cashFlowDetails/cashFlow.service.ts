import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factcashflowdetails } from 'src/entities/cashFlowDetails.entity';

@Injectable()
export class CashFlowService {
  constructor(
    @InjectRepository(Factcashflowdetails)
    private readonly cashFlowRepository: Repository<Factcashflowdetails>,
  ) {}

  findAll() {
    return this.cashFlowRepository.find();
  }

  async getCashFlowDetailsByRecordId(
    recordId: number,
  ): Promise<Factcashflowdetails> {
    const cashFlowDetails = await this.cashFlowRepository.findOne({
      where: { RecordId: recordId },
    });
    return cashFlowDetails;
  }

  async createCashFlowDetail(
    cashFlow: Factcashflowdetails,
  ): Promise<Factcashflowdetails> {
    const cashFlowDetail = this.cashFlowRepository.create({ ...cashFlow });
    return this.cashFlowRepository.save(cashFlowDetail);
  }
}
