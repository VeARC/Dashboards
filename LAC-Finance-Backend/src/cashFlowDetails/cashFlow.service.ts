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

  //Get all cashflow details
  findAll() {
    return this.cashFlowRepository.find();
  }

  //Get Cashflow detail by record id
  async getCashFlowDetailsByRecordId(
    recordId: number,
  ): Promise<Factcashflowdetails> {
    const cashFlowDetails = await this.cashFlowRepository.findOne({
      where: { RecordId: recordId },
    });
    return cashFlowDetails;
  }

  //Create a new Cashflow
  async createCashFlowDetail(
    cashFlow: Factcashflowdetails,
  ): Promise<Factcashflowdetails> {
    const cashFlowDetail = this.cashFlowRepository.create({
      ...cashFlow,
    });
    return await this.cashFlowRepository.save(cashFlowDetail);
  }

  //Update a new Cashflow
  async updateCashFlowDetail(
    id: number,
    cashFlow: Factcashflowdetails,
  ): Promise<any> {
    await this.cashFlowRepository.update(id, cashFlow);
    return await this.getCashFlowDetailsByRecordId(id); //this.cashFlowRepository.save(cashFlowDetail);
  }

  //Delete a cashflow
  async deleteCashFlowDetail(id: number): Promise<any> {
    return this.cashFlowRepository.delete(id);
  }
}
