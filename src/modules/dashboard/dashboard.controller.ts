import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('financial-summary')
  financialSummary(
    @Query('churchId') churchId: string,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    return this.dashboardService.financialSummary(churchId, +year, +month);
  }

  @Get('top-five-financial-church')
  topFiveFinancialChurch(
    @Query('churchId') churchId: string,
  ) {
    return this.dashboardService.topFiveFinancialChurch(churchId);
  }
}
