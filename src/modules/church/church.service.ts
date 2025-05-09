import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChurchService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateChurchDto, churchId: string) {
    if (data.role !== 'MATRIZ' && !churchId) {
      throw new NotFoundException('Como não é Matriz, informar uma Matriz!');
    }
    return this.prisma.$transaction(async (tx) => {
      const address = await tx.address.create({
        data: data.address
      });

      const contact = await tx.contact.create({
        data: {
          email: data.contact.email,
          numberContact: { set: data.contact.numberContact }
        }
      });

      const church = await tx.church.create({
        data: {
          name: data.name,
          foundationDate: new Date(data.foundationDate),
          role: data.role,
          parentChurchId: churchId ?? null,
          addressChurchId: address.id,
          contactChurchId: contact.id
        }
      });

      return church;
    });
  }

  findAll(churchId: string) {
    return this.prisma.church.findMany({ 
      where: {
        OR: [
          { id: churchId },
          { parentChurchId: churchId }
        ]
      }
    });
  }

  findOne(id: string) {
    return this.prisma.church.findUnique({ where: { id } });;
  }

  update(id: string, data: UpdateChurchDto) {
    return this.prisma.$transaction(async (tx) => {
      const church = await tx.church.findUniqueOrThrow({
        where: { id },
        include: {
          address: true,
          contact: true
        }
      });

      if (data.address) {
        await tx.address.update({
          where: { id: church.addressChurchId! },
          data: data.address
        });
      }

      if (data.contact) {
        await tx.contact.update({
          where: { id: church.contactChurchId! },
          data: {
            email: data.contact.email,
            numberContact: { set: data.contact.numberContact }
          }
        });
      }

      const { address, contact, ...churchData } = data;

      return tx.church.update({
        where: { id },
        data: {
          ...churchData
        }
      });
    });
  }

  async remove(id: string) {
    return this.prisma.church.delete({ where: { id } });
  }

  async getAllDecendantChurches(rootId: string): Promise<string[]> {
    const descendantIds: string[] = [];

    const queue: string[] = [rootId];

    while(queue.length > 0) {
      const currentId = queue.shift()!;
      descendantIds.push(currentId);

      const children = await this.prisma.church.findMany({
        where: { parentChurchId: currentId },
        select: { id: true }
      });

      const childIds = children.map(child => child.id);
      queue.push(...childIds);
    }

    return descendantIds;
  }
}
