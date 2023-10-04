import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VisitorsModule } from './visitors/visitors.module';

@Module({
  imports: [PrismaModule, VisitorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
