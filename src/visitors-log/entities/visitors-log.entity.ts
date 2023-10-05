import { ApiProperty } from '@nestjs/swagger';
import { CondoEntity } from 'src/condos/entities/condo.entity';
import { UnitEntity } from 'src/units/entities/unit.entity';
import { VisitorEntity } from 'src/visitors/entities/visitor.entity';

export class VisitorLogEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  visitors_id: number;

  @ApiProperty()
  condos_id: number;

  @ApiProperty()
  units_id: number;

  @ApiProperty()
  entry: Date;

  @ApiProperty()
  exit: Date;
}

export class VisitorLogDetailEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  visitors: VisitorEntity;

  @ApiProperty()
  condos: CondoEntity;

  @ApiProperty()
  units: UnitEntity;

  @ApiProperty()
  entry: Date;

  @ApiProperty()
  exit: Date;
}
