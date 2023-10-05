import { Module } from '@nestjs/common';
import { VisitorsLogService } from './visitors-log.service';
import { VisitorsLogController } from './visitors-log.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CondosService } from 'src/condos/condos.service';
import { VisitorsService } from 'src/visitors/visitors.service';
import { UnitsService } from 'src/units/units.service';

@Module({
  controllers: [VisitorsLogController],
  providers: [
    VisitorsLogService,
    VisitorsService,
    CondosService,
    UnitsService,
],
  imports: [PrismaModule],
})
export class VisitorsLogModule {}
