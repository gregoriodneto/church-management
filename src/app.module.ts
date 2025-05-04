import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChurchModule } from './modules/church/church.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FinancesModule } from './modules/finances/finances.module';
import { MembersModule } from './modules/members/members.module';
import { ContactModule } from './modules/contact/contact.module';
import { AddressModule } from './modules/address/address.module';
import { DiaryModule } from './modules/diary/diary.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    ChurchModule, 
    DashboardModule, 
    FinancesModule, 
    MembersModule, AddressModule, ContactModule, DiaryModule, EventModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
