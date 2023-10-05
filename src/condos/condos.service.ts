import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CondosService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const condos = await this.prisma.condos.findMany();

    return {
      info: {
        name: 'Sistema de controle de acesso',
        description: 'Lista de condomínios',
      },
      items: condos,
    };
  }

  async findOne(id: number) {
    const condo = await this.prisma.condos.findUnique({ where: { id } });
    if (!condo) {
      throw new NotFoundException({
        error: `The condominium with id ${id} does not exist`,
      });
    }
    return condo;
  }
}
