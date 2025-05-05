import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ChurchService } from '../church/church.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly churchService: ChurchService,
  ) {}

  async financialSummary(churchId: string, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const church = await this.prisma.church.findUnique({ where: { id: churchId } })
    if (!church) {
      throw new NotFoundException('Igreja não encontrada');
    }

    const finances = await this.prisma.finance.findMany({
      where: {
        receiverChurchId: churchId,
        createdAt: {
          gte: startDate,
          lt: endDate
        }
      },
      include: {
        church: {
          select: {
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return ({
      church: church.name,
      tipo_igreja: church.role,
      finances: finances.map(f => ({
        descricao: f.description,
        valor: f.value,
        data_operacao: f.createdAt
      }))
    });
  }

  async topFiveFinancialChurch(churchId: string) {
    const rootChurch = await this.prisma.church.findUnique({ 
      where: { id: churchId },
      include: { relatedChurches: true, parentChurch: true },
    });
    if (!rootChurch) {
      throw new NotFoundException('Igreja não encontrada');
    }

    const allChurchs = await this.churchService.getAllDecendantChurches(churchId);

    const finances = await this.prisma.finance.findMany({
      where: {
        receiverChurchId: { in: allChurchs }
      },
      include: {
        church: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      }
    });

    const totals: Record<string, { name: string; total: number; }> = {};

    for (const fin of finances) {
      const id = fin.church?.id!;
      if (!totals[id]) {
        totals[id] = { name: fin.church?.name!, total: 0 }
      }
      totals[id].total += Number(fin.value);
    }

    return Object.values(totals)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }

}
