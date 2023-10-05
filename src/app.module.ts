import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VisitorsModule } from './visitors/visitors.module';
import { UnitsModule } from './units/units.module';
import { CondosModule } from './condos/condos.module';
import { VisitorsLogModule } from './visitors-log/visitors-log.module';

@Module({
  imports: [
    PrismaModule,
    VisitorsModule,
    UnitsModule,
    CondosModule,
    VisitorsLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
