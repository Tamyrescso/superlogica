import { Controller, Get, Param, HttpCode } from '@nestjs/common';
import { CondosService } from './condos.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CondoEntity, CondosEntity } from './entities/condo.entity';

@Controller('condos')
@ApiTags('condos')
export class CondosController {
  constructor(private readonly condosService: CondosService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: CondosEntity })
  async findAll() {
    return await this.condosService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: CondoEntity })
  async findOne(@Param('id') id: string) {
    return await this.condosService.findOne(+id);
  }
}
