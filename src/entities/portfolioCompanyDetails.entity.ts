import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dimportcodetails {
  @PrimaryGeneratedColumn()
  PortCoId: number;

  @Column()
  PortCoName: string;

  @Column()
  Created_Date: Date;
}
