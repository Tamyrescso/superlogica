import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { UnitsService } from 'src/units/units.service';
import { unitsFindAllMock, unitsFindOneMock, unitsPrismaMock } from './mocks/units.mock';

describe('UnitsService', () => {
  let service: UnitsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitsService,
        { provide: PrismaService, useValue: unitsPrismaMock },
      ],
    }).compile();

    service = module.get<UnitsService>(UnitsService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of units', async () => {

      const result = await service.findAll();

      expect(result).toEqual(unitsFindAllMock);
      expect(prisma.units.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a unit by id', async () => {

      const result = await service.findOne(1);

      expect(result).toEqual(unitsFindOneMock);
      expect(prisma.units.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if unit is not found', async () => {
      jest.spyOn(prisma.units, 'findUnique').mockResolvedValue(null);

      try {
        await service.findOne(555);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('The unit with id 555 does not exist');
      }
    });
  });
});
