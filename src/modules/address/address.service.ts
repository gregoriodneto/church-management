import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAddressDto) {
    return this.prisma.address.create({ data });
  }

  findAll() {
    return this.prisma.address.findMany();
  }

  findOne(id: string) {
    return this.prisma.address.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateAddressDto) {
    return this.prisma.address.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.address.delete({ where: { id } });
  }
}
