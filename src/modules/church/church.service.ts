import { Injectable } from '@nestjs/common';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChurchService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateChurchDto) {
    return this.prisma.church.create({ data });
  }

  findAll() {
    return this.prisma.church.findMany();
  }

  findOne(id: string) {
    return this.prisma.church.findUnique({ where: { id } });;
  }

  update(id: string, data: UpdateChurchDto) {
    return this.prisma.church.update({ where: { id }, data });
  }

  remove(id: string) {
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
