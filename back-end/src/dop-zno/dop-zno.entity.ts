import {Entity, PrimaryGeneratedColumn, Column, ViewColumn} from 'typeorm';

@Entity({ name: 'dop_zno' })
export class DopZnoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    /* Инвентаризация */
    @Column({ name: 'inventory_request' })
    inventoryRequest: string;

    @Column({ name: 'inventory_status' })
    inventoryStatus: string;

    @Column({ name: 'inventory_solution' })
    inventorySolution: string;

    @Column({ name: 'inventory_date' })
    inventoryDate: Date;

    @Column({ name: 'inventory_plan_solution_date' })
    inventoryPlanSolutionDate: Date;


    @Column({ name: 'inventory_parsed' })
    inventoryParsed: number;

    @Column({ name: 'inventory_type' })
    inventoryType: string;

    @Column({ name: 'inventory_tb' })
    inventoryTb: string;

    @Column({ name: 'inventory_postcode' })
    inventoryPostcode: string;

    @Column({ name: 'inventory_floor' })
    inventoryFloor: string;

    @Column({ name: 'inventory_zone' })
    inventoryZone: string;


    @Column({ name: 'inventory_workplace' })
    inventoryWorkplace: string;


    @Column({ name: 'inventory_cabinet' })
    inventoryCabinet: string;

    @Column({ name: 'inventory_nettop_serial' })
    inventoryNettopSerial: string;

    @Column({ name: 'inventory_nettop_number' })
    inventoryNettopNumber: string;

    @Column({ name: 'inventory_nettop_maker' })
    inventoryNettopMaker: string;

    @Column({ name: 'inventory_nettop_model' })
    inventoryNettopModel: string;


    @Column({ name: 'inventory_domen' })
    inventoryDomen: string;

    @Column({ name: 'inventory_ip' })
    inventoryIp: string;

    @Column({ name: 'inventory_mac' })
    inventoryMac: string;

    @Column({ name: 'inventory_resolution' })
    inventoryResolution: string;

    @Column({ name: 'inventory_lcd_serial' })
    inventoryLcdSerial: string;


    @Column({ name: 'inventory_lcd_number' })
    inventoryLcdNumber: string;

    @Column({ name: 'inventory_lcd_maker' })
    inventoryLcdMaker: string;

    @Column({ name: 'inventory_lcd_model' })
    inventoryLcdModel: string;

    @Column({ name: 'inventory_lcd_diagonal' })
    inventoryLcdDiagonal: string;

    @Column({ name: 'inventory_lcd_aspect_ratio' })
    inventoryLcdAspectRation: string;


    @Column({ name: 'inventory_lcd_orientation' })
    inventoryLcdOrientation: string;

    @Column({ name: 'inventory_height' })
    inventoryHeight: string;

    @Column({ name: 'inventory_lcd_place' })
    inventoryLcdPlace: string;

    @Column({ name: 'inventory_lcd_setting' })
    inventoryLcdSetting: string;

    @Column({ name: 'inventory_lcd_status' })
    inventoryLcdStatus: string;


    @Column({ name: 'inventory_rs232_status' })
    inventoryRs232Status: string;

    @Column({ name: 'inventory_image_balance' })
    inventoryImageBalance: string;

    @Column({ name: 'inventory_image_status' })
    inventoryImageStatus: string;

    @Column({ name: 'inventory_broken_pixel' })
    inventoryBrokenPixel: string;

    @Column({ name: 'inventory_q_code' })
    inventoryQCode: string;

    @Column({ name: 'inventory_link' })
    inventoryLink: string;
}
