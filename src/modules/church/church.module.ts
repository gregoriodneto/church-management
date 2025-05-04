import { Module } from '@nestjs/common';
import { ChurchService } from './church.service';
import { ChurchController } from './church.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChurchController],
  providers: [ChurchService],
})
export class ChurchModule {}
