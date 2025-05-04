import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, StatusEvent, TypeEvent } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateEventDto) {
    const data: Prisma.EventCreateInput = {
      title: dto.title,
      description: dto.description,
      date: new Date(dto.date),
      location: dto.location,
      isPublic: dto.isPublic ?? false,
      diary: dto.diaryId ? { connect: { id: dto.diaryId } } : undefined,
      status: dto.status ? StatusEvent[dto.status as keyof typeof StatusEvent] : undefined,
      type: dto.type ? { set: dto.type.map(t => TypeEvent[t as keyof typeof TypeEvent]) } : { set: [] },
    };

    return this.prisma.event.create({ data });
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateEventDto) {    
    const data: Prisma.EventUpdateInput = {
      title: dto.title,
      description: dto.description,
      date: new Date(dto.date ?? new Date()),
      location: dto.location,
      isPublic: dto.isPublic ?? false,
      diary: dto.diaryId ? { connect: { id: dto.diaryId } } : undefined,
      status: dto.status ? StatusEvent[dto.status as keyof typeof StatusEvent] : undefined,
      type: dto.type ? { set: dto.type.map(t => TypeEvent[t as keyof typeof TypeEvent]) } : { set: [] },
    };
    
    return this.prisma.event.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
