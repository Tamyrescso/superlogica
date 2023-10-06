import { Test, TestingModule } from '@nestjs/testing';
import { unitsFindAllMock, unitsFindOneMock, unitsPrismaMock } from './mocks/units.mock';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnitsController } from 'src/units/units.controller';
import { UnitsService } from 'src/units/units.service';
import { NotFoundException } from '@nestjs/common';

describe('UnitsController', () => {
  let controller: UnitsController;
  let service: UnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitsController],
      providers: [
        UnitsService,
        { provide: PrismaService, useValue: unitsPrismaMock }
      ],
    }).compile();

    controller = module.get<UnitsController>(UnitsController);
    service = module.get<UnitsService>(UnitsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of units', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(unitsFindAllMock);

      const result = await controller.findAll();

      expect(result).toBe(unitsFindAllMock);
    });
  });

  describe('findOne', () => {
    it('should return a unit by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(unitsFindOneMock);

      const result = await controller.findOne('2');

      expect(result).toBe(unitsFindOneMock);
    });

    it('should handle non-existent unit', async () => {
      const unitId = '999';
      jest.spyOn(service, 'findOne').mockRejectedValue(
        new NotFoundException('The unit with id 999 does not exist')
      );

      try {
        await controller.findOne(unitId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe('The unit with id 999 does not exist');
      }
    });
  });
});
