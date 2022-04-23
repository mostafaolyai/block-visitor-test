import { Injectable } from '@nestjs/common';
import { PaginationModel } from './model/pagination';

@Injectable()
export class PaginationService {
    pagination(count: number, page: number, limitCount?: number): { pagination: PaginationModel; skip: number } {
        let limit: number = limitCount ?? +process.env.pagination_limit;

        if (isNaN(count) || count <= 0) return { pagination: null, skip: 0 };

        limit = isNaN(Number(limit)) ? +process.env.pagination_limit : Number(limit);
        if (limit < 1) limit = +process.env.pagination_limit;

        const total: number = Math.ceil(count / limit);

        page = isNaN(Number(page)) ? 1 : Number(page);
        if (page < 1) page = 1;
        else if (page > total) page = total;

        return {
            pagination: { count, limit, page: { current: page, total } },
            skip: (page - 1) * limit,
        };
    }

    aggregatPagination(page: number, limitCount?: number): { pagination: PaginationModel; skip: number } {
        let limit: number = limitCount ?? +process.env.pagination_limit;

        limit = isNaN(Number(limit)) ? +process.env.pagination_limit : Number(limit);
        if (limit < 1) limit = +process.env.pagination_limit;

        page = isNaN(Number(page)) ? 1 : Number(page);
        if (page < 1) page = 1;

        return {
            pagination: { count: 0, limit, page: { current: page, total: 0 } },
            skip: (page - 1) * limit,
        };
    }

    includePaginationToAggregate(limit: number, beforePipeLines: any[], afterPipeLines: any[], skip?: number): any[] {
        const paginationPipes = [];
        if (!isNaN(skip) && skip)
            paginationPipes.push({ $skip: skip });
        if (!isNaN(limit))
            paginationPipes.push({ $limit: limit });
        return [].concat(beforePipeLines, paginationPipes, afterPipeLines);
    }
}
