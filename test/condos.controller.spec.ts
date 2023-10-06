import { Test, TestingModule } from '@nestjs/testing';
import { CondosController } from '../src/condos/condos.controller';
import { CondosService } from '../src/condos/condos.service';
import { condoFindAllMock, condoFindOneMock, condoPrismaMock } from './mocks/condos.mock';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('CondosController', () => {
  let controller: CondosController;
  let service: CondosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CondosController],
      providers: [
        CondosService,
        { provide: PrismaService, useValue: condoPrismaMock }
      ],
    }).compile();

    controller = module.get<CondosController>(CondosController);
    service = module.get<CondosService>(CondosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of condos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(condoFindAllMock);

      const result = await controller.findAll();

      expect(result).toBe(condoFindAllMock);
    });
  });

  describe('findOne', () => {
    it('should return a condo by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(condoFindOneMock);

      const result = await controller.findOne('2');

      expect(result).toBe(condoFindOneMock);
    });

    it('should handle non-existent condo', async () => {
      const condoId = '999';
      jest.spyOn(service, 'findOne').mockRejectedValue(
        new NotFoundException('The condominium with id 999 does not exist')
      );

      try {
        await controller.findOne(condoId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toBe('The condominium with id 999 does not exist');
      }
    });
  });
});
