import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiDefaultResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidatorPipe } from '../../common/validator/interface/validator.pipe';
import { ApiAddTargetRq, ApiAddTargetRs } from './rq-rs/add';
import { TargetService } from './target.service';

@Controller('target')
@ApiTags('Target')
export class TargetController {
    constructor(private readonly targetService: TargetService) {}

    @ApiOperation({ summary: 'add target' })
    @ApiBody({ type: ApiAddTargetRq })
    @ApiDefaultResponse({ type: ApiAddTargetRs })
    @Post()
    async addTarget(@Body(ValidatorPipe) body: ApiAddTargetRq): Promise<ApiAddTargetRs> {
        return this.targetService.addTarget(body);
    }

    @ApiOperation({ summary: 'update target' })
    @ApiBody({ type: ApiUpdateTargetRq })
    @ApiParam({ name: 'targetId', type: String, required: true, description: 'target id' })
    @ApiDefaultResponse({ type: ApiUpdateTargetRs })
    @Put(':targetId')
    async customerUpdate(
        @Body(ValidatorPipe) body: ApiUpdateTargetRq,
        @Param('targetId', new ObjectIdPipe('targetId')) targetId: Types.ObjectId,
    ): Promise<ApiUpdateTargetRs> {
        return this.targetService.updateTarget(targetId, body);
    }

    // @ApiOperation({ summary: 'get target list' })
    // @ApiParam({ name: 'targetId', type: String, required: true, description: 'target id' })
    // @ApiDefaultResponse({ type: [String] })
    // @Get()
    // async customerCampaigns(
    //     @Param('targetId', new ObjectIdPipe('targetId')) targetId: Types.ObjectId,): Promise<string[]> {
    //     return await this.targetService.customerCampaigns(targetId);
    // }

    // @ApiOperation({ summary: 'get target by id' })
    // @ApiParam({ name: 'targetId', type: String, required: true, description: 'target id' })
    // @ApiDefaultResponse({ type: [String] })
    // @Get(':targetId')
    // async customerCampaigns(
    //     @Param('targetId', new ObjectIdPipe('targetId')) targetId: Types.ObjectId,): Promise<string[]> {
    //     return await this.targetService.customerCampaigns(targetEmail);
    // }
}
