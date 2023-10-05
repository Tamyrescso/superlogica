import { ApiProperty } from "@nestjs/swagger";

export class UnitEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    condos_id: number;
}

class Info {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    items: UnitEntity[];
}

export class UnitsEntity {
    @ApiProperty()
    info: Info;
}
