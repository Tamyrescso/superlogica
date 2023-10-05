import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitorsLogDto } from './dto/create-visitors-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CondosService } from 'src/condos/condos.service';
import { UnitsService } from 'src/units/units.service';
import { VisitorsService } from 'src/visitors/visitors.service';

@Injectable()
export class VisitorsLogService {
  constructor(
    private prisma: PrismaService,
    private condosDb: CondosService,
    private unitsDb: UnitsService,
    private visitorsDb: VisitorsService,
  ) {}

  async visitorCheckIn(createVisitorsLogDto: CreateVisitorsLogDto) {
    await this.validateVisitorLogInfo(createVisitorsLogDto);
    return await this.prisma.visitorsLog.create({ data: createVisitorsLogDto });
  }
  
  async findAll() {
    return await this.prisma.visitorsLog.findMany();
  }
  
  async findOne(id: number) {
    const visitorLog = await this.prisma.visitorsLog.findUnique({ where: { id } });
    if (!visitorLog) {
      throw new NotFoundException({
        error: `The visitor log with id ${id} does not exist`,
      });
    }
    return visitorLog;
  }
  
  async visitorCheckOut (id: number) {
    const { exit } = await this.findOne(id);

    await this.validateIfWasAlreadyCheckedOut(exit, id);
    
    return await this.prisma.visitorsLog.update({
      where: { id },
      data: { exit: new Date().toISOString() },
    });
  }
  
  async validateVisitorLogInfo(createVisitorsLogDto: CreateVisitorsLogDto) {
    const { visitors_id, condos_id, units_id } = createVisitorsLogDto;

    await this.visitorsDb.findOne(visitors_id);
    await this.condosDb.findOne(condos_id);
    await this.unitsDb.findOne(units_id);

    await this.validateUnitExistenceInCondo(condos_id, units_id);

    await this.validateVisitorCheckOutBeforeNewCheckIn(visitors_id);
  }

  async validateUnitExistenceInCondo(
    condos_id: number,
    units_id: number
  ) {
    const units = await this.unitsDb.findAll();
    const thereIsUnitInCondo = (units.items).some(({ id, condos_id: condo_id }) => (
      id === units_id && condo_id === condos_id
    ));

    if(!thereIsUnitInCondo) {
      throw new BadRequestException({
        error: `The requested unit ${units_id} does not belong to the specified condominium ${condos_id}.`,
      });
    }
  }

  async validateVisitorCheckOutBeforeNewCheckIn(visitors_id: number) {
    const visitorLogs = await this.prisma.visitorsLog.findMany({ where: { visitors_id } });
    const thereIsCheckInWhithoutCheckOut = visitorLogs.some((log) => (
      !log.exit
    ));
  
    if(thereIsCheckInWhithoutCheckOut) {
      throw new BadRequestException({
        error: `The visitor ${visitors_id} has an open check in.`,
      });
    }
  }

  async validateIfWasAlreadyCheckedOut(exit: Date, visitorsLog_id: number) {
    if(exit !== null) {
      throw new BadRequestException({
        error: `The visitor log ${visitorsLog_id} was already checked out.`,
      });
    }
  }
}
