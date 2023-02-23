import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dimshareclass {
  @PrimaryGeneratedColumn()
  ShareClassId: number;

  @Column()
  ShareClass: string;

  @Column()
  Created_Date: Date;
}
