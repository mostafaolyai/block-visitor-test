import { ApiProperty } from '@nestjs/swagger';
import { TargetModel } from '../../../model/target';
import * as moment from 'moment';

export class ApiGetTargetRs {
    @ApiProperty({ required: false, description: 'request id' })
    id: string;

    @ApiProperty({ description: 'value', type: Number, example: '0.5' })
    value: number;

    @ApiProperty({ description: 'maxAcceptsPerDay', type: Number, example: '5' })
    maxAcceptsPerDay: number;

    @ApiProperty({ description: 'maxAcceptsPerDay', type: Number, example: '5' })
    maxAcceptsPerDayRemained: number;

    @ApiProperty({ description: 'url', type: String })
    url: string;

    @ApiProperty({
        type: 'object',
        properties: {
            geoState: { type: 'array', items: { type: 'string' } },
            hour: { type: 'array', items: { type: 'string' } },
        },
    })
    accept?: {
        geoState: string[];
        hour: string[];
    };

    @ApiProperty({ required: false, description: 'created date', example: '16 Jun, 2021 - 16:16' })
    created: string;

    constructor(target: TargetModel) {
        this.id = target.id;
        this.value = target.value;
        this.maxAcceptsPerDay = target.maxAcceptsPerDay;
        this.maxAcceptsPerDayRemained = target.maxAcceptsPerDayRemained;
        this.url = target.url;
        this.accept = target.accept
            ? {
                  geoState: target?.accept?.geoState,
                  hour: target?.accept?.hour,
              }
            : null;
        this.created = moment(target.created).format('DD MMMM, YYYY - HH:mm');
    }
}
