import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { HashService } from 'src/common/hashes/hashe-service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService, HashService]
})
export class UserModule {}
