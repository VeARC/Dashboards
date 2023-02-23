import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Factcashflowdetails {
  @PrimaryGeneratedColumn()
  RecordId: number;

  @Column()
  PortCoId: number;

  @Column()
  FundId: number;

  @Column()
  ShareClassId: number;

  @Column()
  Date: Date;

  @Column()
  InvestmentCost: number;

  @Column()
  InvEstimatedValue: number;

  @Column()
  CreatedBy: string;

  @Column()
  CreatedDate: Date;

  @Column()
  ModifiedBy: string;

  @Column()
  ModifiedDate: Date;

  @Column()
  VersionId: number;
}
