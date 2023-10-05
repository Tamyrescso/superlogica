import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const units = await this.prisma.units.findMany();

    return {
      info: {
        name: 'Sistema de controle de acesso',
        description: 'Lista de unidades',
      },
      items: units,
    };
  }

  async findOne(id: number) {
    const unit = await this.prisma.units.findUnique({ where: { id } });
    if (!unit) {
      throw new NotFoundException({
        error: `The unit with id ${id} does not exist`,
      });
    }
    return unit;
  }
}
