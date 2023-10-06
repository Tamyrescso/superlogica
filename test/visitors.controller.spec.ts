import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsController } from 'src/visitors/visitors.controller';
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
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateVisitorDto } from 'src/visitors/dto/update-visitor.dto';

describe('VisitorsController', () => {
  let controller: VisitorsController;
  let service: VisitorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorsController],
      providers: [
        VisitorsService,
        { provide: PrismaService, useValue: visitorPrismaMock },
      ],
    }).compile();

    controller = module.get<VisitorsController>(VisitorsController);
    service = module.get<VisitorsService>(VisitorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new visitor', async () => {
      const result = await controller.create(visitorCreateMock);

      expect(result).toBeDefined();
      expect(result).toBe(visitorCreateResponseMock);
    });

    it('should handle validation error for create', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new BadRequestException([
            'fullName should not be empty',
            'rg invalid',
          ]),
        );
      const createVisitorMock = {
        fullName: '',
        rg: '5555555555555555555',
      };

      try {
        await controller.create(createVisitorMock);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.statusCode).toBe(400);
        expect(error.response.message).toEqual([
          'fullName should not be empty',
          'rg invalid',
        ]);
      }
    });
  });

  describe('findAll', () => {
    it('should return a list of visitors', async () => {
      const result = await controller.findAll();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(visitorFindAllMock);
    });
  });

  describe('findOne', () => {
    it('should return a visitor by id', async () => {
      const visitorId = '1';
      const result = await controller.findOne(visitorId);

      expect(result).toBeDefined();
      expect(result).toBe(visitorFindAllMock[0]);
    });

    it('should handle NotFoundException for findOne', async () => {
      const visitorId = '999';
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('The visitor with id 999 does not exist'),
        );
      try {
        await controller.findOne(visitorId);
      } catch (error) {
        expect(error.message).toBe(
          `The visitor with id ${visitorId} does not exist`,
        );
      }
    });
  });

  describe('update', () => {
    it('should update a visitor by id', async () => {
      const result = await controller.update(
        `'${visitorIdUpdateMock}'`,
        visitorUpdateMock,
      );

      expect(result).toBeDefined();
      expect(result).toBe(visitorUpdateResponseMock);
    });

    it('should handle validation error for update', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new BadRequestException([
            'fullName should not be empty',
            'rg invalid',
          ]),
        );
      const visitorId = '1';
      const updateVisitorDto: UpdateVisitorDto = {
        fullName: '',
        rg: '234345',
      };

      try {
        await controller.update(visitorId, updateVisitorDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.statusCode).toBe(400);
        expect(error.response.message).toEqual([
          'fullName should not be empty',
          'rg invalid',
        ]);
      }
    });
  });

  describe('remove', () => {
    it('should remove a visitor by id', async () => {
      const visitorId = '1';
      const result = await controller.remove(visitorId);

      expect(result).toBeUndefined();
    });

    it('should handle NotFoundException for remove', async () => {
      const visitorId = '999';
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('The visitor with id 999 does not exist'),
        );
      try {
        await controller.remove(visitorId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(
          `The visitor with id ${visitorId} does not exist`,
        );
      }
    });
  });
});
