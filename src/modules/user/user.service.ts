import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { HashService } from 'src/common/hashes/hashe-service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService
  ) {}

  async createFromMember(tx: Prisma.TransactionClient, dto: CreateUserDto) {
    const member = await tx.member.findUnique({
      where: { id: dto.memberId }
    });

    if (!member) {
      throw new NotFoundException('Membro da Igreja não encontrado!');
    }

    const hashedPassword = await this.hashService.hash(dto.password);

    return tx.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        memberId: dto.memberId,
        churchId: member.churchMemberId!
      }
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
