import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGateway } from './auth.gateway';
import { MainViewModule } from './main-view/main-view.module';
import dbConfig from './db.config';
import { MainView } from './main-view/main-view.entity';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { TemplatesModule } from './templates/templates.module';
import { TemplatesGateway } from './templates/templates.gateway';
import { Templates } from './templates/templates.entity';
import { TemplateCodesModule } from './template-codes/template-codes.module';
import { TemplateCodesGateway } from './template-codes/template-codes.gateway';
import { TemplateCodesEntity } from './template-codes/template-codes.entity';
import { MainModule } from './main/main.module';
import { MainGateway } from './main/main.gateway';
import { MainEntity } from './main/main.entity';
import { MainViewGateway } from './main-view/main-view.gateway';
import { RefreshRequestModule } from './requests/refresh-request/refresh-request.module';
import { RefreshRequestGateway } from './requests/refresh-request/refresh-request.gateway';
import { SmRequestModule } from './requests/sm-request/sm-request.module';
import { SmRequestEntity } from './requests/sm-request/sm-request.entity';
import { TbGroupsModule } from './tb-groups/tb-groups.module';
import { TbGroupEntity } from './tb-groups/tb-group.entity';

import { SmRequestGateway } from './requests/sm-request/sm-request.gateway';
import { FileLoggerModule } from './file-logger/file-logger.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { RoadmapEntity } from './roadmap/roadmap.entity';

import { RoadmapGateway } from './roadmap/roadmap.gateway';

import { SchedulerModule } from './scheduler/scheduler.module';
import { SchedulerGateway } from './scheduler/scheduler.gateway';
import { VipVspModule } from './vip-vsp/vip-vsp.module';
import { VipVspGateway } from './vip-vsp/vip-vsp.gateway';
import { VipVspEntity } from './vip-vsp/vip-vsp.entity';
import { VipVspViewEntity } from './vip-vsp/vip-vsp-view.entity';
import { VipRequestModule } from './requests/vip-request/vip-request.module';
import { VipRequestGateway } from './requests/vip-request/vip-request.gateway';
import { VipVspRoadmapEntity } from './vip-vsp/vip-vsp-roadmap.entity';
import { DopZnoModule } from './dop-zno/dop-zno.module';
import { DopZnoEntity } from './dop-zno/dop-zno.entity';
import { ConfigModule } from './config/config.module';
import { ConfigEntity } from './config/config.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: dbConfig.dbArm.host,
      username: dbConfig.dbArm.username,
      password: dbConfig.dbArm.password,
      database: dbConfig.dbArm.database,
      entities: [
        MainView,
        Users,
        Templates,
        TemplateCodesEntity,
        MainEntity,
        SmRequestEntity,
        TbGroupEntity,
        VipVspEntity,
        VipVspRoadmapEntity,
        VipVspViewEntity,
        RoadmapEntity,
        DopZnoEntity,
        ConfigEntity,
      ],
      retryAttempts: 0,
      synchronize: false,
      logging: true,
      requestTimeout: 300000,
      options: {
        encrypt: false,
      },
    }),
    MainViewModule,
    AuthModule,
    SocketModule,
    TemplatesModule,
    TemplateCodesModule,
    MainModule,
    RefreshRequestModule,
    SmRequestModule,
    TbGroupsModule,
    FileLoggerModule,
    RoadmapModule,
    SchedulerModule,
    VipVspModule,
    VipRequestModule,
    DopZnoModule,
    ConfigModule,
  ],
  providers: [
    AuthGateway,
    TemplatesGateway,
    TemplateCodesGateway,
    MainGateway,
    MainViewGateway,
    RefreshRequestGateway,
    SmRequestGateway,
    RoadmapGateway,
    SchedulerGateway,
    VipVspGateway,
    VipRequestGateway,
    ConfigEntity,
  ],
})
export class AppModule {}
