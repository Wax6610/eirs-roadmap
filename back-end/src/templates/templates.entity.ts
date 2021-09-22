import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({})
export class Templates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code_name' })
  codeName: string;

  @Column({ name: 'name' })
  name: string;


  @Column()
  text: string;
}
