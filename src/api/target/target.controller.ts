import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiDefaultResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectIdPipe } from '../../common/pipes/object-id';
import { ValidatorPipe } from '../../common/validator/interface/validator.pipe';
import { ApiAddTargetRq, ApiAddTargetRs } from './rq-rs/add';
import { ApiUpdateTargetRq, ApiUpdateTargetRs } from './rq-rs/update';
import { TargetService } from './target.service';
import { Types } from 'mongoose';
import { TargetModel } from '../../model/target';
import { ApiGetTargetRs } from './rq-rs/get-target';
import { ApiTargetListRs } from './rq-rs/target-list';

@Controller('target')
@ApiTags('Target')
export class TargetController {
    constructor(private readonly targetService: TargetService) {}

    @ApiOperation({ summary: 'add target' })
    @ApiBody({ type: ApiAddTargetRq })
    @ApiDefaultResponse({ type: ApiAddTargetRs })
    @Post()
    async addTarget(@Body(ValidatorPipe) body: ApiAddTargetRq): Promise<ApiAddTargetRs> {
        return this.targetService.add(body);
    }

    @ApiOperation({ summary: 'update target' })
    @ApiBody({ type: ApiUpdateTargetRq })
    @ApiParam({ name: 'targetId', type: String, required: true, description: 'target id' })
    @ApiDefaultResponse({ type: ApiUpdateTargetRs })
    @Put(':targetId')
    async updateTarget(
        @Body(ValidatorPipe) body: ApiUpdateTargetRq,
        @Param('targetId', new ObjectIdPipe('targetId')) targetId: Types.ObjectId,
    ): Promise<ApiUpdateTargetRs> {
        return this.targetService.update(targetId, body);
    }

    @ApiOperation({ summary: 'get target list' })
    @ApiQuery({ name: 'page', type: Number, required: true, description: 'current page number' })
    @ApiDefaultResponse({ type: ApiTargetListRs })
    @Get()
    async targetList(@Query('page') page: number): Promise<ApiTargetListRs> {
        return this.targetService.list(page);
    }

    @ApiOperation({ summary: 'get target by id' })
    @ApiParam({ name: 'targetId', type: String, required: true, description: 'target id' })
    @ApiDefaultResponse({ type: ApiGetTargetRs })
    @Get(':targetId')
    async getTargetById(@Param('targetId', new ObjectIdPipe('targetId')) targetId: Types.ObjectId): Promise<ApiGetTargetRs> {
        return this.targetService.getById(targetId);
    }
}
