import { Injectable } from '@nestjs/common';
import { ApiDecisionRq, ApiDecisionRs } from './rq-rs/decision';
import * as moment from 'moment';
import { TargetService } from '../target/target.service';

@Injectable()
export class RouteService {
    constructor(private readonly targetService: TargetService) {}

    async decision(body: ApiDecisionRq): Promise<ApiDecisionRs> {
        const hour = moment(body.timestamp)
            .utc()
            .format('HH')
            .toString()
            .replace(/^(?:00:)?0?/, '');

        const target = await this.targetService.findTargetByCondition({
            'accept.geoState': { $elemMatch: { $eq: body.geoState } },
            'accept.hour': { $elemMatch: { $eq: hour } },
            maxAcceptsPerDayRemained: { $ne: 0 },
        });

        if (target) {
            target.maxAcceptsPerDayRemained -= 1;
            await target.save();
            return new ApiDecisionRs('ACCEPTED');
        }

        return new ApiDecisionRs('REJECTED');
    }
}
