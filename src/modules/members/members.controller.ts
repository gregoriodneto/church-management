import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @CurrentUser() user,
    @Body() createMemberDto: CreateMemberDto
  ) {
    return this.membersService.create(createMemberDto, user.churchId);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@CurrentUser() user,) {
    return this.membersService.findAll(user.churchId);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(
    @CurrentUser() user,
    @Param('id') id: string
  ) {
    return this.membersService.findOne(id, user.churchId);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @CurrentUser() user,
    @Param('id') id: string, 
    @Body() updateMemberDto: UpdateMemberDto
  ) {
    return this.membersService.update(id, user.churchId, updateMemberDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(
    @CurrentUser() user,
    @Param('id') id: string
  ) {
    return this.membersService.remove(id, user.churchId);
  }
}
