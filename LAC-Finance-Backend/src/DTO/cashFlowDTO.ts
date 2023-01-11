export type CashFlowDTO = {
  RecordId: number;
  PortCoId: number;
  PortCoName?: string;
  FundId: number;
  FundType?: string;
  ShareClassId: number;
  ShareClass?: string;
  Date: Date;
  InvestmentCost: number;
  InvEstimatedValue: number;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
  VersionId: number;
};
