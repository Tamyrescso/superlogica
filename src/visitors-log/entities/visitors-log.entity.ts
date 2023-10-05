import { ApiProperty } from "@nestjs/swagger";

export class VisitorsLogEntity {
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
