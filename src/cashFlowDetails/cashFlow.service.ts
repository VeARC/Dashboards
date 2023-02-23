import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CashFlowDTO } from 'src/DTO/CashFlowDTO';
import { SearchDTO } from 'src/DTO/searchDTO';
import { Factcashflowdetails } from 'src/entities/cashFlowDetails.entity';
import { Dimfundtypes } from 'src/entities/fundTypes.entity';
import { Dimportcodetails } from 'src/entities/portfolioCompanyDetails.entity';
import { Dimshareclass } from 'src/entities/shareClass.entity';
import { Between, Repository, MoreThan, LessThan } from 'typeorm';

@Injectable()
export class CashFlowService {
  constructor(
    @InjectRepository(Factcashflowdetails)
    private readonly cashFlowRepository: Repository<Factcashflowdetails>,
    @InjectRepository(Dimfundtypes)
    private readonly fundTypesRepository: Repository<Dimfundtypes>,
    @InjectRepository(Dimportcodetails)
    private readonly portCoDetailsRepository: Repository<Dimportcodetails>,
    @InjectRepository(Dimshareclass)
    private readonly shareClassRepository: Repository<Dimshareclass>,
  ) {}

  //Get all cashflow details
  async findAll() {
    const cashFlowDetails = await this.cashFlowRepository.find({
      order: { ModifiedDate: { direction: 'DESC' } },
    });
    const fundTypes = await this.fundTypesRepository.find();
    const portfolios = await this.portCoDetailsRepository.find();
    const shareClasses = await this.shareClassRepository.find();

    // //Need to come up with better approach
    const cashFlowDetailsDTO: CashFlowDTO[] = cashFlowDetails.map((x) => {
      return {
        ...x,
        FundType: fundTypes.find((f) => f.FundId === x.FundId).FundType,
        PortCoName: portfolios.find((p) => p.PortCoId === x.PortCoId)
          .PortCoName,
        ShareClass: shareClasses.find((s) => s.ShareClassId === x.ShareClassId)
          .ShareClass,
      };
    });
    return cashFlowDetailsDTO;
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

  //Bulk Upload Cashflow
  async bulkUploadCashFlow(cashFlows: CashFlowDTO[]): Promise<any> {
    const fundTypes = await this.fundTypesRepository.find();
    const portfolios = await this.portCoDetailsRepository.find();
    const shareClasses = await this.shareClassRepository.find();
    const cashFlowDetails: Factcashflowdetails[] = [];
    cashFlows.map((cashFlow) => {
      cashFlowDetails.push({
        PortCoId: portfolios.find((p) => p.PortCoName === cashFlow.PortCoName)
          .PortCoId,
        FundId: fundTypes.find((f) => f.FundType === cashFlow.FundType).FundId,
        ShareClassId: shareClasses.find(
          (sc) => sc.ShareClass === cashFlow.ShareClass,
        ).ShareClassId,
        InvestmentCost: cashFlow.InvestmentCost,
        InvEstimatedValue: cashFlow.InvEstimatedValue,
        RecordId: null,
        Date: new Date(cashFlow.Date),
        CreatedBy: 'Sai Krishna',
        CreatedDate: null,
        ModifiedBy: 'Krishna',
        ModifiedDate: null,
        VersionId: 1,
      });
    });
    const res = this.cashFlowRepository.save(cashFlowDetails);
    return res;
    // let queryResult = {};
    // cashFlows.map(async (cashFlow) => {
    //   if (cashFlow) {
    //     const sqlQuery = `exec dbo.udp_BulkUploadCashFlowDetails
    //       @PortCoName = '${cashFlow.PortCoName}',
    //       @FundType = '${cashFlow.FundType}',
    //       @ShareClass = '${cashFlow.ShareClass}',
    //       @Date = '${cashFlow.Date}',
    //       @InvestmentCost = ${
    //         cashFlow.InvestmentCost ? cashFlow.InvestmentCost : 0
    //       },
    //       @InvEstimatedValue = ${
    //         cashFlow.InvEstimatedValue ? cashFlow.InvEstimatedValue : 0
    //       }`;
    //     console.log(sqlQuery);
    //     await this.cashFlowRepository
    //       .query(sqlQuery)
    //       .then((res) => {
    //         queryResult = res[0];
    //       })
    //       .catch((exception) => {
    //         throw exception;
    //       });
    //   }
    // });
    // return queryResult;
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

  //search cashflow
  async searchCashFlowDetails(searchParams: SearchDTO): Promise<any> {
    const fundType = await this.fundTypesRepository.findOne({
      where: {
        FundId: searchParams.FundId > 0 ? searchParams.FundId : MoreThan(0),
      },
    });

    const shareClass = await this.shareClassRepository.findOne({
      where: {
        ShareClassId:
          searchParams.ShareClassId > 0
            ? searchParams.ShareClassId
            : MoreThan(0),
      },
    });

    const portfolio = await this.portCoDetailsRepository.findOne({
      where: {
        PortCoId:
          searchParams.PortCoId > 0 ? searchParams.PortCoId : MoreThan(0),
      },
    });
    const cashFlowDetails = await this.cashFlowRepository.find({
      where: [
        {
          FundId: searchParams.FundId > 0 ? searchParams.FundId : MoreThan(0),
          ShareClassId:
            searchParams.ShareClassId > 0
              ? searchParams.ShareClassId
              : MoreThan(0),
          PortCoId:
            searchParams.PortCoId > 0 ? searchParams.PortCoId : MoreThan(0),
          Date: searchParams.endDate
            ? Between(searchParams.startDate, searchParams.endDate)
            : LessThan(new Date('8888-12-31')),
        },
      ],
      order: { ModifiedDate: { direction: 'DESC' } },
    });

    // //Need to come up with better approach
    const cashFlowDetailsDTO: CashFlowDTO[] = cashFlowDetails.map((x) => {
      return {
        ...x,
        FundType: fundType.FundType,
        PortCoName: portfolio.PortCoName,
        ShareClass: shareClass.ShareClass,
      };
    });
    return cashFlowDetailsDTO;
  }

  async getYears(): Promise<any> {
    return this.cashFlowRepository
      .query(`SELECT DISTINCT(YEAR(Date)) Year FROM factCashFlowDetails
    ORDER BY YEAR(Date) DESC`);
  }
}
