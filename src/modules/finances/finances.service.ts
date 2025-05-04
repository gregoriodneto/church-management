import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FinancesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFinanceDto) {
    return this.prisma.finance.create({ data });
  }

  findAll() {
    return this.prisma.finance.findMany();
  }

  findOne(id: string) {
    return this.prisma.finance.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateFinanceDto) {
    return this.prisma.finance.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.finance.delete({ where: { id } });
  }
}
