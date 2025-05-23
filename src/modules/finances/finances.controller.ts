import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';

@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @CurrentUser() user,
    @Body() createFinanceDto: CreateFinanceDto
  ) {
    return this.financesService.create(createFinanceDto, user.churchId);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(    
    @CurrentUser() user,
  ) {
    return this.financesService.findAll(user.churchId);
  }

  @Get('/finance-summary')
  @UseGuards(JwtGuard)
  findAllFinanceSummary(
    @CurrentUser() user,
    @Query('month') month: string,
    @Query('year') year: string
  ) {
    return this.financesService.findAllFinanceSummary(user.churchId, +month, +year);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
    return this.financesService.update(id, updateFinanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financesService.remove(id);
  }
}
