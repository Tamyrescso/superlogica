import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { VisitorsService } from 'src/visitors/visitors.service';
import {
  visitorCreateMock,
  visitorCreateResponseMock,
  visitorFindAllMock,
  visitorIdUpdateMock,
  visitorPrismaMock,
  visitorUpdateMock,
  visitorUpdateResponseMock,
} from './mocks/visitors.mock';

describe('VisitorsService', () => {
  let service: VisitorsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitorsService,
        { provide: PrismaService, useValue: visitorPrismaMock },
      ],
    }).compile();

    service = module.get<VisitorsService>(VisitorsService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new visitor', async () => {
      const result = await service.create(visitorCreateMock);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result).toBe(visitorCreateResponseMock);
      expect(prisma.visitors.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a list of visitors', async () => {
      const result = await service.findAll();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(visitorFindAllMock);
      expect(prisma.visitors.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a visitor by id', async () => {
      const visitorId = 1;
      const result = await service.findOne(visitorId);

      expect(result).toBeDefined();
      expect(result).toEqual(visitorFindAllMock[0]);
    });

    it('should throw NotFoundException if visitor is not found', async () => {
      const visitorId = 999;
      jest.spyOn(prisma.visitors, 'findUnique').mockResolvedValue(null);
      try {
        await service.findOne(visitorId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.message).toBe(
          `The visitor with id ${visitorId} does not exist`,
        );
      }
    });
  });

  describe('update', () => {
    it('should update a visitor by id', async () => {
      jest
        .spyOn(prisma.visitors, 'findUnique')
        .mockResolvedValue(visitorUpdateResponseMock);

      const result = await service.update(
        visitorIdUpdateMock,
        visitorUpdateMock,
      );

      expect(result).toBeDefined();
      expect(result).toBe(visitorUpdateResponseMock);
    });
  });

  describe('remove', () => {
    it('should remove a visitor by id', async () => {
      jest
        .spyOn(prisma.visitors, 'findUnique')
        .mockResolvedValue(visitorFindAllMock[4]);
      const visitorId = 5;
      const result = await service.remove(visitorId);

      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if visitor is not found', async () => {
      jest.spyOn(prisma.visitors, 'findUnique').mockResolvedValue(null);
      try {
        await service.remove(4444);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.message).toBe(`The visitor with id 4444 does not exist`);
      }
    });
  });
});
