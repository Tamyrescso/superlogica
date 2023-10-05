import { ApiProperty } from '@nestjs/swagger';

export class CondoEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

class Info {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  items: CondoEntity[];
}

export class CondosEntity {
  @ApiProperty()
  info: Info;
}
