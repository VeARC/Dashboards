import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dimportcodetails } from 'src/entities/portfolioCompanyDetails.entity';

@Injectable()
export class PortCoDetailsService {
  constructor(
    @InjectRepository(Dimportcodetails)
    private readonly PortCoDetailsRepository: Repository<Dimportcodetails>,
  ) {}

  findAll() {
    return this.PortCoDetailsRepository.find();
  }

  async getPortCoDetailsById(portCoId: number): Promise<Dimportcodetails> {
    const PortCoDetails = await this.PortCoDetailsRepository.findOne({
      where: { PortCoId: portCoId },
    });
    return PortCoDetails;
  }
}
