import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ChurchModule } from '../church/church.module';

@Module({
  imports: [PrismaModule, ChurchModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
