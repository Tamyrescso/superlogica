import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VisitorsLogService } from './visitors-log.service';
import { CreateVisitorsLogDto } from './dto/create-visitors-log.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  VisitorLogDetailEntity,
  VisitorLogEntity,
} from './entities/visitors-log.entity';
import { UpdateVisitorsLogDto } from './dto/update-visitors-log.dto';

@Controller('visitors-log')
@ApiTags('visitors-log')
export class VisitorsLogController {
  constructor(private readonly visitorsLogService: VisitorsLogService) {}

  @Post('check-in')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ type: VisitorLogEntity })
  create(@Body() createVisitorCheckIn: CreateVisitorsLogDto) {
    return this.visitorsLogService.visitorCheckIn(createVisitorCheckIn);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: VisitorLogDetailEntity, isArray: true })
  findAll() {
    return this.visitorsLogService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: VisitorLogDetailEntity })
  findOne(@Param('id') id: string) {
    return this.visitorsLogService.findOne(+id);
  }

  @Patch('check-out')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ type: VisitorLogEntity })
  update(@Body() doVisitorCheckOut: UpdateVisitorsLogDto) {
    return this.visitorsLogService.visitorCheckOut(doVisitorCheckOut.id);
  }
}
