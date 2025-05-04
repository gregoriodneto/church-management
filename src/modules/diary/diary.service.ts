import { Injectable } from '@nestjs/common';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DiaryService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDiaryDto) {
    return this.prisma.diary.create({ data });
  }

  findAll() {
    return this.prisma.diary.findMany();
  }

  findOne(id: string) {
    return this.prisma.diary.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateDiaryDto) {
    return this.prisma.diary.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.diary.delete({ where: { id } });
  }
}
