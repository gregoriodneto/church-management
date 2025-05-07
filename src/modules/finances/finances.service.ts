import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Finance, TypeContribution } from '@prisma/client';

@Injectable()
export class FinancesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFinanceDto) {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Cria o lançamento
    const dto = {
      description: data.description,
      value: data.value,
      receiverChurchId: data.churchId,
      contributorMemberId: data.memberId
    };
    const finance = await this.prisma.finance.create({ data: dto });

    const isEntrada = this.isEntradaType(data.description);

    const isGasto = this.isGastoType(data.description);

    if (data.churchId && (isEntrada || isGasto)) {
      const summary = await this.prisma.financeSummary.upsert({
        where: {
          month_year_churchId: {
            month,
            year,
            churchId: data.churchId,
          },
        },
        update: {},
        create: {
          month,
          year,
          churchId: data.churchId,
          saldoAnterior: 0,
          entradas: 0,
          gastos: 0,
          saldoMensal: 0,
          saldoAtual: 0,
          patrimonio: 0,
        },
      });

      let entradas = summary.entradas;
      let gastos = summary.gastos;

      if (isEntrada) {
        entradas += data.value;
      } else if (isGasto) {
        gastos += data.value;
      }

      const saldoMensal = entradas - gastos;
      const saldoAtual = summary.saldoAnterior + saldoMensal;

      await this.prisma.financeSummary.update({
        where: { id: summary.id },
        data: {
          entradas,
          gastos,
          saldoMensal,
          saldoAtual,
        },
      });
    }

    return finance;
  }

  findAll(churchId: string) {
    return this.prisma.finance.findMany({
      where: {receiverChurchId: churchId},
      include: {
        church: true,
        member: true,
      }
    });
  }

  findAllFinanceSummary(churchId: string, month: number, year: number) {
    return this.prisma.financeSummary.findMany({ 
      where: { churchId, month: month, year },
      include: {
        church: true
      }
    });
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

  isEntradaType(description: TypeContribution): boolean {
    const entradaTypes: TypeContribution[] = [
      TypeContribution.DIZIMO,
      TypeContribution.OFERTA,
      TypeContribution.DIZIMO_NAO_DECLARADO,
      TypeContribution.DOACOES,
    ];
    return entradaTypes.includes(description);
  }
  
  isGastoType(description: TypeContribution): boolean {
    return description === TypeContribution.GASTO_MENSAL;
  }
}
