import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateVisitorsLogDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;
}