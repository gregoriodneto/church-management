import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly jwt: JwtService
  ) {}

  async login(dto: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { church: true }
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const payload = {
      sub: user.id,
      churchId: user.churchId,
      memberId: user.memberId
    };

    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        churchId: user.churchId,
        memberId: user.memberId,
        churchName: user.church.name,
      },
    };
  }
}
