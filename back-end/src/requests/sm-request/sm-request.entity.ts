import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'sm_request' })
export class SmRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'callback_contact_sm' })
  callbackContactSm: string;

  @Column({ name: 'initiator_sm' })
  initiatorSm: string;

  @Column({ name: 'tpl_id' })
  tplId: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'assignment_sm' })
  assignmentSm: string;

  @Column({ name: 'assignment_name' })
  assignmentName: string;

  @Column({ name: 'service' })
  service: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'created_id' })
  createdId: string;

  @Column({ name: 'processed' })
  processed: number;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'resolution_code' })
  resolutionCode: string;

  @Column({ name: 'solution' })
  solution: string;

  @Column({ name: 'solution_date' })
  solutionDate: Date;

  @Column({ default: '' })
  number: number;

  @Column({ default: '' })
  vsp: string;

  @Column()
  template: string;

  @Column({ name: 'response_soap' })
  responseSoap: string;

  @Column({ name: 'timestamp' })
  timestamp: Date;

  @Column({ name: 'timestamp_soap' })
  timestampSoap: Date;


}
