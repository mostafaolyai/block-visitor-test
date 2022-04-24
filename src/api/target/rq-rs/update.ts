import { ApiProperty } from '@nestjs/swagger';
import { ApiAddTargetRq } from './add';

export class ApiUpdateTargetRq extends ApiAddTargetRq {}
export class ApiUpdateTargetRs {
    @ApiProperty({ required: false, type: 'string', description: 'updated id' })
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}
