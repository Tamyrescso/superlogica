import { Module } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { VisitorsController } from './visitors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VisitorsController],
  providers: [VisitorsService],
  imports: [PrismaModule],
})
export class VisitorsModule {}
