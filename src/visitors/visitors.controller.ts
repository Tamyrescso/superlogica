import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VisitorEntity } from './entities/visitor.entity';

@Controller('visitors')
@ApiTags('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ type: VisitorEntity })
  async create(@Body() createVisitorDto: CreateVisitorDto) {
    return await this.visitorsService.create(createVisitorDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: VisitorEntity, isArray: true })
  async findAll() {
    return await this.visitorsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: VisitorEntity })
  async findOne(@Param('id') id: string) {
    return await this.visitorsService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: VisitorEntity })
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() updateVisitorDto: UpdateVisitorDto,
  ) {
    return await this.visitorsService.update(+id, updateVisitorDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async remove(@Param('id') id: string) {
    return await this.visitorsService.remove(+id);
  }
}
