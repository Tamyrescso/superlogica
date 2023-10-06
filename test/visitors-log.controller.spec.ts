import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsLogController } from '../src/visitors-log/visitors-log.controller';
import { VisitorsLogService } from '../src/visitors-log/visitors-log.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkInMock, checkInResponseMock, updateResponseMock, visitorsLogsFindAllMock, visitorsLogsPrismaMock } from './mocks/visitors-log.mock';
import { NotFoundException } from '@nestjs/common';
import { CondosService } from 'src/condos/condos.service';
import { UnitsService } from 'src/units/units.service';
import { VisitorsService } from 'src/visitors/visitors.service';

describe('VisitorsLogsController', () => {
  let controller: VisitorsLogController;
  let service: VisitorsLogService;
  let condosService: CondosService;
  let unitsService: UnitsService;
  let visitorsService: VisitorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorsLogController],
      providers: [
        UnitsService,
        CondosService,
        VisitorsService,
        VisitorsLogService,
        { provide: PrismaService, useValue: visitorsLogsPrismaMock }
      ],
    }).compile();

    controller = module.get<VisitorsLogController>(VisitorsLogController);
    service = module.get<VisitorsLogService>(VisitorsLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a visitor check-in log', async () => {

      jest.spyOn(service, 'visitorCheckIn').mockResolvedValue(checkInResponseMock);

      const createdLog = await controller.create(checkInMock);

      expect(createdLog).toEqual(checkInResponseMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of visitor logs', async () => {

      jest.spyOn(service, 'findAll').mockResolvedValue(visitorsLogsFindAllMock);

      const allLogs = await controller.findAll();

      expect(allLogs).toEqual(visitorsLogsFindAllMock);
    });
  });

  describe('findOne', () => {
    it('should return a specific visitor log', async () => {
      const logId = '1';

      jest.spyOn(service, 'findOne').mockResolvedValue(visitorsLogsFindAllMock[0]);

      const foundLog = await controller.findOne(logId);

      expect(foundLog).toEqual(visitorsLogsFindAllMock[0]);
    });

    it('should throw NotFoundException for non-existent log', async () => {
      const nonExistentLogId = '999';
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      try {
        await controller.findOne(nonExistentLogId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Visitor log not found');
      }
    });
  });

  describe('update', () => {
    it('should update a visitor check-out log', async () => {

      jest.spyOn(service, 'visitorCheckOut').mockResolvedValue(updateResponseMock);

      const checkedOutLog = await controller.update({ id: 1 });

      expect(checkedOutLog).toEqual(updateResponseMock);
    });
  });
});
