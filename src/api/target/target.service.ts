import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { TargetDB, TargetModel } from '../../model/target';
import { ApiAddTargetRq, ApiAddTargetRs } from './rq-rs/add';

@Injectable()
export class TargetService {
    constructor(@InjectModel(TargetDB) private readonly targetModel: Model<TargetModel>) {}

    async addTarget(body: ApiAddTargetRq): Promise<ApiAddTargetRs> {
        const target = await this.targetModel.create({
            value: body.value,
            maxAcceptsPerDay: body.maxAcceptsPerDay,
            maxAcceptsPerDayRemained: body.maxAcceptsPerDay,
            accept: {
                geoState: body?.accept?.geoState,
                hour: body?.accept?.hour,
            },
        });

        return new ApiAddTargetRs(target.id);
    }
}
