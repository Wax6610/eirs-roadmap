import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ViewColumn,
  ViewEntity,
} from 'typeorm';

@ViewEntity({ name: 'vip_vsp_view' })
export class VipVspViewEntity {
  @ViewColumn()
  id: number;

  @ViewColumn()
  tb: string;

  @ViewColumn()
  type: string;

  @ViewColumn()
  vsp: string;

  @ViewColumn({ name: 'screen_name' })
  screenName: string;

  @ViewColumn()
  city: string;

  @ViewColumn()
  address: string;

  @ViewColumn()
  schedule: string;

  @ViewColumn({ name: 'screen_number' })
  screenNumber: number;

  @ViewColumn({ name: 'nettop_number' })
  nettopNumber: number;

  @ViewColumn({ name: 'visit_time' })
  visitTime: string;

  @ViewColumn()
  mol: string;

  //---------
  @ViewColumn({ name: 'check_request' })
  checkRequest: string;

  @ViewColumn({ name: 'check_status' })
  checkStatus: string;

  @Column({ name: 'check_solution' })
  checkSolution: string;

  @ViewColumn({ name: 'check_date' })
  checkDate: Date;

  @Column({ name: 'check_plan_solution_date' })
  checkPlanSolutionDate: string;

  // -- Результат проверки

  @ViewColumn({ name: 'is_screen' })
  isScreen: boolean;

  @ViewColumn({ name: 'is_nettop' })
  isNettop: boolean;

  @ViewColumn({ name: 'is_220' })
  is220: boolean;

  @ViewColumn({ name: 'is_lan' })
  isLan: boolean;

  @ViewColumn({ name: 'is_warned' })
  isWarned: boolean;

  //-----------------
  @ViewColumn({ name: 'screen' })
  screen: boolean;

  @ViewColumn({ name: 'nettop' })
  nettop: boolean;

  @ViewColumn({ name: '220' })
  i220: boolean;

  @ViewColumn({ name: 'lan' })
  lan: boolean;

  @ViewColumn({ name: 'warned' })
  warned: boolean;

  @ViewColumn({ name: 'place' })
  place: boolean;
  //---------------------

  @ViewColumn({ name: 'connect_request' })
  connectRequest: string;

  @ViewColumn({ name: 'connect_status' })
  connectStatus: string;

  @Column({ name: 'connect_solution' })
  connectSolution: string;

  @ViewColumn({ name: 'connect_date' })
  connectDate: Date;

  @Column({ name: 'connect_plan_solution_date' })
  connectPlanSolutionDate: string;
}
