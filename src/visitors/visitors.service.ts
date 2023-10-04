import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VisitorsService {
  constructor(private prisma: PrismaService) {}

  async create(createVisitorDto: CreateVisitorDto) {
    return await this.prisma.visitors.create({ data: createVisitorDto });
  }

  async findAll() {
    return await this.prisma.visitors.findMany();
  }

  async findOne(id: number) {
    const visitor = await this.prisma.visitors.findUnique({ where: { id } });
    if (!visitor) {
      throw new NotFoundException({
        error: `A visitor with id ${id} does not exist`,
      });
    }
    return visitor;
  }

  async update(id: number, updateVisitorDto: UpdateVisitorDto) {
    await this.findOne(id);
    return await this.prisma.visitors.update({
      where: { id },
      data: updateVisitorDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.visitors.delete({ where: { id } });
  }
}
