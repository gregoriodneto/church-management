import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChurchModule } from './modules/church/church.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FinancesModule } from './modules/finances/finances.module';
import { MembersModule } from './modules/members/members.module';

@Module({
  imports: [
    ChurchModule, 
    DashboardModule, 
    FinancesModule, 
    MembersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
