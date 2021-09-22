import { Entity, PrimaryGeneratedColumn, Column, ViewColumn } from 'typeorm';

@Entity({ name: 'vip_vsp' })
export class VipVspEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tb: string;

  @Column()
  type: string;

  @Column()
  vsp: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  schedule: string;

  @Column({ name: 'screen_number' })
  screenNumber: number;

  @Column({ name: 'nettop_number' })
  nettopNumber: number;

  @Column({ name: 'visit_time' })
  visitTime: string;

  @Column()
  mol: string;

}
