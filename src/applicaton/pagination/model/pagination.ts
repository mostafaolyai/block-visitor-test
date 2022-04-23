import { ApiProperty } from '@nestjs/swagger';

export class PaginationModel {
    @ApiProperty({ required: false, description: 'all data count' })
    count: number;

    @ApiProperty({ required: false, description: 'count per page' })
    limit: number;

    @ApiProperty({
        type: 'object',
        required: false,
        title: 'page detail',
        properties: {
            current: { type: 'number', description: 'current page number' },
            total: { type: 'number', description: 'page count' },
        },
    })
    page: {
        current: number;
        total: number;
    };
}
