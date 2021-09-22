import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tb_groups' })
export class TbGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'code' })
  code: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'short_name' })
  shortName: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'sbs_sm_card' })
  sbsSmCard: string;

  @Column({ name: 'sbs_sm_contact' })
  sbsSmContact: string;

  @Column({ name: 'it_active_sm_card' })
  itActiveSmCard: string;

  @Column({ name: 'it_active_sm_contact' })
  itActiveSmContact: string;
}
