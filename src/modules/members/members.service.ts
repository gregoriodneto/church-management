import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'prisma/prisma.service';
import { calculateAge } from 'src/common/date.util';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMemberDto) {
    const age = calculateAge(data.dateOfBirth);
    return this.prisma.member.create({ 
      data: { 
        ...data,
        age 
      } 
    });
  }

  findAll() {
    return this.prisma.member.findMany();
  }

  findOne(id: string) {
    return this.prisma.member.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateMemberDto) {
    return this.prisma.member.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.member.delete({ where: { id } });
  }
}
