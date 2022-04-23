import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../applicaton/pagination/model/pagination';
import { TargetModel } from '../../../model/target';
import { ApiGetTargetRs } from './get-target';

export class ApiTargetListRs {
    @ApiProperty({ description: 'AI Memory List', type: [ApiGetTargetRs], required: false })
    list: ApiGetTargetRs[];

    @ApiProperty({
        type: PaginationModel,
        required: false,
        title: 'pagination',
        description: 'this is null, if list be empty',
    })
    pagination: PaginationModel;

    constructor(requests: TargetModel[], pagination: PaginationModel) {
        this.list = requests.map((r) => new ApiGetTargetRs(r));

        this.pagination = pagination;
    }
}
