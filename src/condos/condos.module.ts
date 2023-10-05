import { Module } from '@nestjs/common';
import { CondosService } from './condos.service';
import { CondosController } from './condos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CondosController],
  providers: [CondosService],
  imports: [PrismaModule],
})
export class CondosModule {}
