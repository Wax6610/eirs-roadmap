import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({   })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'domain_account' })
  domainAccount: string;

  @Column({ name: 'sm_card' })
  smCard: string;

  @Column({ name: 'sm_contact' })
  smContact: string;

  @Column({ name: 'fullname' })
  fullname: string;
}
