import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'main' })
export class MainEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  tb: string;

  @Column()
  status: string;

  @Column()
  lastSeen: Date;

  @Column()
  playerVersion: string;

  @Column()
  code: string;

  @Column()
  tags: string;

  @Column()
  address: string;

  @Column()
  description: string;

  @Column()
  created: Date;

  @Column()
  updated: Date;

  @Column()
  connnected: Date;

  @Column()
  os: string;

  @Column()
  cpu: string;

  @Column()
  ram: string;

  @Column()
  pcName: string;

  @Column()
  userName: string;

  @Column({ name: 'inner_ip' })
  innerIp: string;

  @Column({ name: 'external_ip' })
  externalIp: string;

  @Column()
  timezone: string;

  @Column()
  attributes: string;

  @Column()
  cycle: string;

  @Column()
  period: string;
}
