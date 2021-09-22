import { Module } from '@nestjs/common';
import { MainViewService } from './main-view.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainView } from './main-view.entity';
import { AuthModule } from '../auth/auth.module';
import { MainViewController } from './main-view.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MainView]),
    AuthModule,
    MainViewModule,
    ConfigModule,
  ],
  providers: [MainViewService],
  exports: [MainViewService],
  controllers: [MainViewController],
})
export class MainViewModule {}
