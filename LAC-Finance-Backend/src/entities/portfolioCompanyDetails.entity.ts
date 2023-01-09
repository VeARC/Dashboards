import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dimportcodetails {
  @PrimaryGeneratedColumn()
  PortCoId: number;

  @Column()
  ProtCoName: string;

  @Column()
  Created_Date: Date;
}
