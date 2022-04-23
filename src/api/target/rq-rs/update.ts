import { ApiProperty } from '@nestjs/swagger';
import { Validator } from '../../../common/validator/validator';
import { ApiAddTargetRq } from './add';

export class ApiUpdateTargetRq extends ApiAddTargetRq {}
export class ApiUpdateTargetRs {
    @ApiProperty({ required: false, type: 'id', description: 'created id' })
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}
/**
 * 
    @ApiProperty({ description: 'value', type: Number, example: '0.5' })
    @Validator({
        required: true,
        title: 'value',
        type: 'number',
    })
    value: number;

    @ApiProperty({ description: 'maxAcceptsPerDay', type: Number, example: '5' })
    @Validator({
        required: true,
        title: 'maxAcceptsPerDay',
        type: 'number',
    })
    maxAcceptsPerDay: number;

    @ApiProperty({ description: 'url', type: String })
    @Validator({
        required: true,
        title: 'url',
    })
    url: string;

    @ApiProperty({
        type: 'object',
        properties: {
            geoState: { type: 'array', items: { type: 'string' } },
            hour: { type: 'array', items: { type: 'string' } },
        },
    })
    @Validator({
        geoState: { required: false, type: 'string[]', title: 'geoState' },
        hour: { required: false, type: 'string[]', title: 'hour' },
    })
    accept?: {
        geoState: string[];
        hour: string[];
    };
 */
