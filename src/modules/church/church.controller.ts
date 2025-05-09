import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChurchService } from './church.service';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';

@Controller('church')
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @CurrentUser() user,
    @Body() createChurchDto: CreateChurchDto)
  {
    return this.churchService.create(createChurchDto, user.churchId);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(
    @CurrentUser() user,
  ) {
    return this.churchService.findAll(user.churchId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.churchService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChurchDto: UpdateChurchDto) {
    return this.churchService.update(id, updateChurchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.churchService.remove(id);
  }
}
