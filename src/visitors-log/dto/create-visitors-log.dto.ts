import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVisitorsLogDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  visitors_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  condos_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  units_id: number;
}
