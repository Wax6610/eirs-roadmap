import { Column, PrimaryGeneratedColumn } from 'typeorm';

export interface ImportDto {
  number: number;
  name: string;
  status: string;
  lastSeen: string;
  playerVersion: string;
  code: string;
  tags: string;
  address: string;
  description: string;
  created: string;
  updated: string;
  connnected: string;
  os: string;
  cpu: string;
  ram: string;
  pcName: string;
  userName: string;
  innerIp: string;
  externalIp: string;
  timezone: string;
  attributes: string;
  cycle: string;
}
