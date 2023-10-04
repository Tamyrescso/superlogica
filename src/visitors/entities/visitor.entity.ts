import { ApiProperty } from '@nestjs/swagger';
import { Visitors } from '@prisma/client';

export class VisitorEntity implements Visitors {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  rg: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
