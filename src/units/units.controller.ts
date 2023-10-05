import { Controller, Get, Param, HttpCode } from '@nestjs/common';
import { UnitsService } from './units.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UnitEntity, UnitsEntity } from './entities/unit.entity';

@Controller('units')
@ApiTags('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: UnitsEntity })
  async findAll() {
    return await this.unitsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: UnitEntity })
  async findOne(@Param('id') id: string) {
    return await this.unitsService.findOne(+id);
  }
}
