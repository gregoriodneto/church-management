import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

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
}
