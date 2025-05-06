import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'prisma/prisma.service';
import { calculateAge } from 'src/common/date.util';
import { Prisma } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMemberDto) {
    const age = calculateAge(data.dateOfBirth);
    
    try {
      return this.prisma.$transaction(async (tx) => {
        const address = await tx.address.create({
          data: data.address
        })
  
        const contact = await tx.contact.create({
          data: {
            email: data.contact.email,
            numberContact: { set: data.contact.numberContact }
          }
        });
  
        const member = await tx.member.create({
          data: {
            name: data.name,
            age: age,
            dateOfBirth: data.dateOfBirth,
            addressMemberId: address.id,
            contactMemberId: contact.id,
            churchDepartament: data.churchDepartament,
            churchMember: data.churchMember,
            churchMinistry: data.churchMinistry,
            churchMemberId: 'faef35e3-608c-494e-b309-659510dbcd44'
          }
        });
  
        return member;
      });
    } catch (error) {
      console.error('[MemberService][create] Error:', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Erro ao criar membro');
    }
  }

  findAll() {
    return this.prisma.member.findMany();
  }

  findOne(id: string) {
    return this.prisma.member.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateMemberDto) {
    return this.prisma.$transaction(async (tx) => {
      const member = await this.prisma.member.findUnique({
        where: { id },
        include: {
          address: true,
          contact: true,
          church: true
        }
      });

      if (data.address) {
        await tx.address.update({
          where: { id: member?.addressMemberId! },
          data: data.address
        });
      }

      if (data.contact) {
        await tx.contact.update({
          where: { id: member?.contactMemberId! },
          data: {
            email: data.contact.email,
            numberContact: { set: data.contact.numberContact }
          }
        });
      }

      const { address, contact, ...memberData } = data;

      return tx.member.update({
        where: { id },
        data: {
          ...memberData
        }
      });
    });
  }

  remove(id: string) {
    return this.prisma.member.delete({ where: { id } });
  }
}
