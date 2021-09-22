import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'vip_vsp_roadmap' })
export class VipVspRoadmapEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //---------
  @Column({ name: 'check_request' })
  checkRequest: string;

  @Column({ name: 'check_status' })
  checkStatus: string;

  @Column({ name: 'check_solution' })
  checkSolution: string;

  @Column({ name: 'check_date' })
  checkDate: Date;

  @Column({ name: 'check_plan_solution_date' })
  checkPlanSolutionDate: string;

  // -- Результат проверки

  @Column({ name: 'is_screen' })
  isScreen: boolean;

  @Column({ name: 'is_nettop' })
  isNettop: boolean;

  @Column({ name: 'is_220' })
  is220: boolean;

  @Column({ name: 'is_lan' })
  isLan: boolean;

  @Column({ name: 'is_warned' })
  isWarned: boolean;

  @Column({ name: 'is_parsed' })
  isParsed: boolean;

  //------

  @Column({})
  screen: string;

  @Column()
  nettop: string;

  @Column({ name: '220' })
  i220: string;

  @Column()
  lan: string;

  @Column()
  warned: string;

  @Column()
  place: string;
}
