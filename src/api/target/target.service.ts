import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { PaginationService } from '../../applicaton/pagination/pagination.service';
import { TargetDB, TargetModel } from '../../model/target';
import { ApiAddTargetRq, ApiAddTargetRs } from './rq-rs/add';
import { ApiGetTargetRs } from './rq-rs/get-target';
import { ApiTargetListRs } from './rq-rs/target-list';
import { ApiUpdateTargetRq, ApiUpdateTargetRs } from './rq-rs/update';

@Injectable()
export class TargetService {
    constructor(
        @InjectModel(TargetDB) private readonly targetModel: Model<TargetModel>,
        private readonly paginationService: PaginationService,
    ) {}

    async add(body: ApiAddTargetRq): Promise<ApiAddTargetRs> {
        const target = await this.targetModel.create({
            value: body.value,
            maxAcceptsPerDay: body.maxAcceptsPerDay,
            maxAcceptsPerDayRemained: body.maxAcceptsPerDay,
            url: body.url,
            accept: {
                geoState: body?.accept?.geoState,
                hour: body?.accept?.hour,
            },
        });

        return new ApiAddTargetRs(target.id);
    }

    async findTargetById(targetId: Types.ObjectId): Promise<TargetModel> {
        const target = await this.targetModel.findOne({ _id: targetId });
        if (!target) throw new NotFoundException('target not found');
        return target;
    }

    async findTargetByCondition(condition: FilterQuery<TargetModel>): Promise<TargetModel> {
        return this.targetModel.findOne({ ...condition });
    }

    async update(targetId: Types.ObjectId, body: ApiUpdateTargetRq): Promise<ApiUpdateTargetRs> {
        const target = await this.findTargetById(targetId);

        const diff = body.maxAcceptsPerDay - target.maxAcceptsPerDay;
        const diff2 = target.maxAcceptsPerDay - target.maxAcceptsPerDayRemained;

        target.value = body.value;
        target.maxAcceptsPerDayRemained =
            body.maxAcceptsPerDay > target.maxAcceptsPerDay
                ? target.maxAcceptsPerDayRemained + diff
                : body.maxAcceptsPerDay > diff2
                ? target.maxAcceptsPerDayRemained + diff
                : 0;
        target.maxAcceptsPerDay = body.maxAcceptsPerDay;
        target.url = body.url;
        target.accept = {
            geoState: [...body?.accept?.geoState],
            hour: [...body?.accept?.hour],
        };
        await target.save();

        return new ApiUpdateTargetRs(target.id);
    }

    async getById(targetId: Types.ObjectId): Promise<ApiGetTargetRs> {
        const target = await this.findTargetById(targetId);
        return new ApiGetTargetRs(target);
    }

    async list(page: number): Promise<ApiTargetListRs> {
        const count: number = await this.targetModel.countDocuments({});
        const { pagination, skip } = this.paginationService.pagination(count, page);
        if (count === 0)
            return {
                list: [],
                pagination,
            };

        const targetList = await this.targetModel.find({}).skip(skip).limit(pagination.limit);
        return new ApiTargetListRs(targetList, pagination);
    }
}
