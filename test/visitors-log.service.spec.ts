import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  checkInMock,
  checkInResponseMock,
  checkOutResponseMock,
  visitorsLogsFindAllMock,
  visitorsLogsPrismaMock,
} from './mocks/visitors-log.mock';
import { VisitorsLogService } from 'src/visitors-log/visitors-log.service';
import { CreateVisitorsLogDto } from 'src/visitors-log/dto/create-visitors-log.dto';
import { CondosService } from 'src/condos/condos.service';
import { UnitsService } from 'src/units/units.service';
import { VisitorsService } from 'src/visitors/visitors.service';
import { unitsFindAllMock } from './mocks/units.mock';

describe('VisitorsLogService', () => {
  let visitorsLogService: VisitorsLogService;
  let prismaService: PrismaService;
  let condosService: CondosService;
  let unitsService: UnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitsService,
        CondosService,
        VisitorsService,
        VisitorsLogService,
        { provide: PrismaService, useValue: visitorsLogsPrismaMock },
      ],
    }).compile();

    unitsService = module.get<UnitsService>(UnitsService);
    prismaService = module.get<PrismaService>(PrismaService);
    condosService = module.get<CondosService>(CondosService);
    visitorsLogService = module.get<VisitorsLogService>(VisitorsLogService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(visitorsLogService).toBeDefined();
  });

  describe('visitorCheckIn', () => {
    it('should create a new visitor log', async () => {
      jest.spyOn(condosService, 'findOne').mockReturnThis();
      jest
        .spyOn(unitsService, 'findAll')
        .mockReturnValue(Promise.resolve(unitsFindAllMock));
      jest
        .spyOn(visitorsLogService, 'validateVisitorCheckOutBeforeNewCheckIn')
        .mockReturnThis();

      const result = await visitorsLogService.visitorCheckIn(checkInMock);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result).toBe(checkInResponseMock);
      expect(prismaService.visitorsLog.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a list of visitor logs', async () => {
      const result = await visitorsLogService.findAll();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(visitorsLogsFindAllMock);
      expect(prismaService.visitorsLog.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a visitor log by id', async () => {
      const visitorLogId = 1;
      const result = await visitorsLogService.findOne(visitorLogId);

      expect(result).toBeDefined();
      expect(result).toEqual(visitorsLogsFindAllMock[1]);
    });

    it('should handle NotFoundException for findOne', async () => {
      jest
        .spyOn(prismaService.visitorsLog, 'findUnique')
        .mockResolvedValue(null);
      const visitorLogId = 999;
      try {
        await visitorsLogService.findOne(visitorLogId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.message).toBe(
          `The visitor log with id ${visitorLogId} does not exist`,
        );
      }
    });
  });
  describe('visitorCheckOut', () => {
    it('should check out a visitor by id', async () => {
      const visitorLogId = 1;
      jest
        .spyOn(visitorsLogService, 'findOne')
        .mockResolvedValue(visitorsLogsFindAllMock[0]);
      const result = await visitorsLogService.visitorCheckOut(visitorLogId);

      expect(result).toBeDefined();
      expect(result).toStrictEqual(checkOutResponseMock);
    });

    it('should handle BadRequestException if already checked out', async () => {
      const visitorLogId = 1;
      jest
        .spyOn(visitorsLogService, 'findOne')
        .mockResolvedValue(visitorsLogsFindAllMock[0]);

      jest
        .spyOn(visitorsLogService, 'validateIfWasAlreadyCheckedOut')
        .mockRejectedValue(
          new BadRequestException(
            `The visitor log ${visitorLogId} was already checked out.`,
          ),
        );

      try {
        await visitorsLogService.visitorCheckOut(visitorLogId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.statusCode).toBe(400);
        expect(error.message).toBe(
          `The visitor log ${visitorLogId} was already checked out.`,
        );
      }
    });
  });

  describe('validateVisitorLogInfo', () => {
    it('should validate visitor log info', async () => {
      jest.spyOn(unitsService, 'findAll').mockResolvedValue(unitsFindAllMock);
      jest
        .spyOn(visitorsLogService, 'validateVisitorCheckOutBeforeNewCheckIn')
        .mockReturnThis();

      const validation =
        await visitorsLogService.validateVisitorLogInfo(checkInMock);
      expect(validation).toBeUndefined();
    });

    it('should handle NotFoundException for invalid visitor log info', async () => {
      jest.spyOn(prismaService.units, 'findUnique').mockResolvedValue(null);
      const createVisitorsLogDto: CreateVisitorsLogDto = {
        visitors_id: 1,
        condos_id: 1,
        units_id: 45,
      };

      try {
        await visitorsLogService.validateVisitorLogInfo(createVisitorsLogDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`The unit with id 45 does not exist`);
        expect(error.status).toBe(404);
      }
    });
  });

  describe('validateUnitExistenceInCondo', () => {
    it('should validate unit existence in condo', async () => {
      jest.spyOn(unitsService, 'findAll').mockResolvedValue(unitsFindAllMock);
      const condos_id = 4;
      const units_id = 10;

      await expect(
        visitorsLogService.validateUnitExistenceInCondo(condos_id, units_id),
      ).resolves.not.toThrow();
    });

    it('should handle BadRequestException for unit not in condo', async () => {
      jest.spyOn(unitsService, 'findAll').mockResolvedValue(unitsFindAllMock);
      const condos_id = 1;
      const units_id = 1;

      try {
        await visitorsLogService.validateUnitExistenceInCondo(
          condos_id,
          units_id,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(
          `The requested unit ${units_id} does not belong to the specified condominium ${condos_id}.`,
        );
        expect(error.status).toBe(400);
      }
    });
  });

  describe('validateVisitorCheckOutBeforeNewCheckIn', () => {
    it('should validate visitor check-out before new check-in', async () => {
      jest.spyOn(prismaService.visitorsLog, 'findMany').mockResolvedValue([
        {
          id: 7,
          visitors_id: 3,
          condos_id: 6,
          units_id: 30,
          entry: new Date('1975-11-01T03:01:02.811Z'),
          exit: new Date('2022-03-19T12:38:24.716Z'),
        },
        {
          id: 21,
          visitors_id: 3,
          condos_id: 5,
          units_id: 19,
          entry: new Date('2023-10-06T02:38:59.472Z'),
          exit: new Date('2023-10-07T02:38:59.472Z'),
        },
      ]);
      const visitors_id = 3;

      await expect(
        visitorsLogService.validateVisitorCheckOutBeforeNewCheckIn(visitors_id),
      ).resolves.not.toThrow();
    });

    it('should handle BadRequestException for open check-in', async () => {
      jest.spyOn(prismaService.visitorsLog, 'findMany').mockResolvedValue([
        {
          id: 7,
          visitors_id: 3,
          condos_id: 6,
          units_id: 30,
          entry: new Date('1975-11-01T03:01:02.811Z'),
          exit: new Date('2022-03-19T12:38:24.716Z'),
        },
        {
          id: 21,
          visitors_id: 3,
          condos_id: 5,
          units_id: 19,
          entry: new Date('2023-10-06T02:38:59.472Z'),
          exit: null,
        },
      ]);
      const visitors_id = 3;

      try {
        await visitorsLogService.validateVisitorCheckOutBeforeNewCheckIn(
          visitors_id,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.status).toBe(400);
        expect(error.message).toBe(
          `The visitor ${visitors_id} has an open check in.`,
        );
      }
    });
  });

  describe('validateIfWasAlreadyCheckedOut', () => {
    it('should validate if already checked out', async () => {
      const exit = null;
      const visitorsLog_id = 7;

      await expect(
        visitorsLogService.validateIfWasAlreadyCheckedOut(exit, visitorsLog_id),
      ).resolves.not.toThrow();
    });

    it('should handle BadRequestException if already checked out', async () => {
      const exit = new Date('2022-09-15T21:12:54.365Z');
      const visitorsLogId = 2;

      try {
        await visitorsLogService.validateIfWasAlreadyCheckedOut(
          exit,
          visitorsLogId,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.status).toBe(400);
        expect(error.message).toBe(
          `The visitor log ${visitorsLogId} was already checked out.`,
        );
      }
    });
  });
});
