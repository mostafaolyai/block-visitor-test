import { ApiProperty } from '@nestjs/swagger';
import { DecisionType, DecisionTypesList } from '../../../common/types/decision-type';
import { Validator } from '../../../common/validator/validator';

export class ApiDecisionRq {
    @ApiProperty({ description: 'geoState', type: String })
    @Validator({ required: true, title: 'geoState' })
    geoState: string;

    @ApiProperty({ description: 'publisher', type: String })
    @Validator({ required: true, title: 'publisher' })
    publisher: string;

    //it is request time, that we can don't send and calculate inside service
    @ApiProperty({ description: 'timestamp', type: String, example: '2018-07-19T23:28:59.513Z' })
    @Validator({ required: true, title: 'timestamp' })
    timestamp: string;
}
export class ApiDecisionRs {
    @ApiProperty({ required: false, enum: DecisionTypesList, description: 'decision' })
    decision: DecisionType;

    constructor(decision: DecisionType) {
        this.decision = decision;
    }
}
