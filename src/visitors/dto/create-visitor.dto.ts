import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVisitorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{1,2}\.?(\d{3})\.?(\d{3})-?(\d{1}|[Xx])$/, {
    message: 'rg invalid',
  })
  rg: string;
}
