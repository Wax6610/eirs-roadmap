import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'template_codes' })
export class TemplateCodesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code_name' })
  codeName: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'db_field' })
  dbField: string;
}
