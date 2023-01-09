import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Userdetails {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column()
  UserName: string;
  @Column()
  Password: string;
  @Column()
  FirstName: string;
  @Column()
  LastName: string;
  @Column()
  EmailId: string;
  @Column()
  Active: boolean;
  @Column()
  DateModified: Date;
}
