import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from '../user/user.service';
import { HashService } from 'src/common/hashes/hashe-service';

@Module({
  imports: [PrismaModule],
  controllers: [MembersController],
  providers: [MembersService, UserService, HashService],
})
export class MembersModule {}
