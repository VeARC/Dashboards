import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dimfundtypes {
  @PrimaryGeneratedColumn()
  FundId: number;

  @Column()
  FundType: string;

  @Column()
  Created_Date: Date;
}
