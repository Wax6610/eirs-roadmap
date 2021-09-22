import { ViewEntity, ViewColumn, Column } from 'typeorm';

@ViewEntity({ name: 'main_view' })
export class MainView {
  @ViewColumn({ name: 'id' })
  id: number;

  @ViewColumn()
  number: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  tb: string;

  @ViewColumn()
  path: string;

  @ViewColumn()
  status: string;

  @ViewColumn()
  lastSeen: Date;

  @ViewColumn()
  playerVersion: string;

  @ViewColumn()
  code: string;

  @ViewColumn()
  tags: string;

  @ViewColumn()
  address: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  created: Date;

  @ViewColumn()
  updated: Date;

  @ViewColumn()
  connnected: Date;

  @ViewColumn()
  os: string;

  @ViewColumn()
  cpu: string;

  @ViewColumn()
  ram: string;

  @ViewColumn()
  pcName: string;

  @ViewColumn()
  userName: string;

  @ViewColumn({ name: 'inner_ip' })
  innerIp: string;

  @ViewColumn({ name: 'external_ip' })
  externalIp: string;

  @ViewColumn()
  timezone: string;

  @ViewColumn()
  attributes: string;

  @ViewColumn()
  cycle: string;

  @ViewColumn({ name: 'check_request' })
  checkRequest: string;

  @ViewColumn({ name: 'check_status' })
  checkStatus: string;

  @Column({ name: 'check_solution' })
  checkSolution: string;

  @ViewColumn({ name: 'check_date' })
  checkDate: Date;

  @Column({ name: 'check_plan_solution_date' })
  checkPlanSolutionDate: Date;
  //-----------
  @ViewColumn({ name: 'connect_request' })
  connectRequest: string;

  @ViewColumn({ name: 'connect_status' })
  connectStatus: string;

  @Column({ name: 'connect_solution' })
  connectSolution: string;

  @ViewColumn({ name: 'connect_date' })
  connectDate: Date;

  @Column({ name: 'connect_plan_solution_date' })
  connectPlanSolutionDate: Date;

  //-----------
  @ViewColumn({ name: 'display_request' })
  displayRequest: string;

  @ViewColumn({ name: 'display_status' })
  displayStatus: string;

  @Column({ name: 'display_solution' })
  displaySolution: string;

  @ViewColumn({ name: 'display_date' })
  displayDate: Date;

  @Column({ name: 'display_plan_solution_date' })
  displayPlanSolutionDate: Date;

  //-----------
  @ViewColumn({ name: 'nettop_request' })
  nettopRequest: string;

  @ViewColumn({ name: 'nettop_status' })
  nettopStatus: string;

  @Column({ name: 'nettop_solution' })
  nettopSolution: string;

  @ViewColumn({ name: 'nettop_date' })
  nettopDate: Date;

  @Column({ name: 'nettop_plan_solution_date' })
  nettopPlanSolutionDate: Date;

  //-----------
  @ViewColumn({ name: 'inventory_request' })
  inventoryRequest: string;

  @ViewColumn({ name: 'inventory_status' })
  inventoryStatus: string;

  @ViewColumn({ name: 'inventory_solution' })
  inventorySolution: string;

  @ViewColumn({ name: 'inventory_date' })
  inventoryDate: Date;

  @ViewColumn({ name: 'inventory_plan_solution_date' })
  inventoryPlanSolutionDate: Date;

  @ViewColumn({ name: 'inventory_parsed' })
  inventoryParsed: number;

  @ViewColumn({ name: 'inventory_type' })
  inventoryType: string;

  @ViewColumn({ name: 'inventory_tb' })
  inventoryTb: string;

  @ViewColumn({ name: 'inventory_postcode' })
  inventoryPostcode: string;

  @ViewColumn({ name: 'inventory_floor' })
  inventoryFloor: string;

  @ViewColumn({ name: 'inventory_zone' })
  inventoryZone: string;

  @ViewColumn({ name: 'inventory_cabinet' })
  inventoryCabinet: string;

  @ViewColumn({ name: 'inventory_workplace' })
  inventoryWorkplace: string;

  @ViewColumn({ name: 'inventory_nettop_serial' })
  inventoryNettopSerial: string;

  @ViewColumn({ name: 'inventory_nettop_number' })
  inventoryNettopNumber: string;

  @ViewColumn({ name: 'inventory_nettop_maker' })
  inventoryNettopMaker: string;

  @ViewColumn({ name: 'inventory_nettop_model' })
  inventoryNettopModel: string;

  @ViewColumn({ name: 'inventory_domen' })
  inventoryDomen: string;

  @ViewColumn({ name: 'inventory_ip' })
  inventoryIp: string;

  @ViewColumn({ name: 'inventory_mac' })
  inventoryMac: string;

  @ViewColumn({ name: 'inventory_resolution' })
  inventoryResolution: string;

  @ViewColumn({ name: 'inventory_lcd_serial' })
  inventoryLcdSerial: string;

  @ViewColumn({ name: 'inventory_lcd_number' })
  inventoryLcdNumber: string;

  @ViewColumn({ name: 'inventory_lcd_maker' })
  inventoryLcdMaker: string;

  @ViewColumn({ name: 'inventory_lcd_model' })
  inventoryLcdModel: string;

  @ViewColumn({ name: 'inventory_lcd_diagonal' })
  inventoryLcdDiagonal: string;

  @ViewColumn({ name: 'inventory_lcd_aspect_ratio' })
  inventoryLcdAspectRation: string;

  @ViewColumn({ name: 'inventory_lcd_orientation' })
  inventoryLcdOrientation: string;

  @ViewColumn({ name: 'inventory_height' })
  inventoryHeight: string;

  @ViewColumn({ name: 'inventory_lcd_place' })
  inventoryLcdPlace: string;

  @ViewColumn({ name: 'inventory_lcd_setting' })
  inventoryLcdSetting: string;

  @ViewColumn({ name: 'inventory_lcd_status' })
  inventoryLcdStatus: string;

  @ViewColumn({ name: 'inventory_rs232_status' })
  inventoryRs232Status: string;

  @ViewColumn({ name: 'inventory_image_balance' })
  inventoryImageBalance: string;

  @ViewColumn({ name: 'inventory_image_status' })
  inventoryImageStatus: string;

  @ViewColumn({ name: 'inventory_broken_pixel' })
  inventoryBrokenPixel: string;

  @ViewColumn({ name: 'inventory_q_code' })
  inventoryQCode: string;

  @ViewColumn({ name: 'inventory_link' })
  inventoryLink: string;

  //-------------

  @ViewColumn({ name: 'tech_request' })
  techRequest: string;

  @ViewColumn({ name: 'tech_status' })
  techStatus: string;

  @Column({ name: 'tech_solution' })
  techSolution: string;

  @ViewColumn({ name: 'tech_date' })
  techDate: Date;

  @ViewColumn({ name: 'tech_plan_solution_date' })
  techPlanSolutionDate: Date;

  //-------------------------

  @ViewColumn({ name: 'repair_request' })
  repairRequest: string;

  @ViewColumn({ name: 'repair_status' })
  repairStatus: string;

  @Column({ name: 'repair_solution' })
  repairSolution: string;

  @ViewColumn({ name: 'repair_date' })
  repairDate: Date;

  @ViewColumn({ name: 'repair_plan_solution_date' })
  repairPlanSolutionDate: Date;

  //------------------------------
  @ViewColumn({ name: 'need_upgrade' })
  needUpgrade: boolean;

  @ViewColumn()
  period: string;

  @ViewColumn({ name: 'offline_counter' })
  offlineCounter: boolean;
}
