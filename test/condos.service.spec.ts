import { Test, TestingModule } from '@nestjs/testing';
import { CondosService } from '../src/condos/condos.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { condoFindAllMock, condoFindOneMock, condoPrismaMock } from './mocks/condos.mock';
import { NotFoundException } from '@nestjs/common';

describe('CondosService', () => {
  let service: CondosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CondosService,
        { provide: PrismaService, useValue: condoPrismaMock },
      ],
    }).compile();

    service = module.get<CondosService>(CondosService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of condos', async () => {

      const result = await service.findAll();

      expect(result).toEqual(condoFindAllMock);
      expect(prisma.condos.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a condo by id', async () => {

      const result = await service.findOne(2);

      expect(result).toEqual(condoFindOneMock);
      expect(prisma.condos.findUnique).toHaveBeenCalledWith({
        where: { id: 2 },
      });
    });

    it('should throw NotFoundException if condo is not found', async () => {
      jest.spyOn(prisma.condos, 'findUnique').mockResolvedValue(null);

      try {
        await service.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('The condominium with id 1 does not exist');
      }
    });
  });
});
