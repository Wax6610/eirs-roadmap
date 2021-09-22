import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'config' })
export class ConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

  @Column({ name: 'text_value' })
  textValue: string;

  @Column({ name: 'num_value' })
  numValue: number;

  @Column({ name: 'date_value' })
  dateValue: Date;

  @Column()
  description: Date;
}
