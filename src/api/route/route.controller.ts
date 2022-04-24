import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiDefaultResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidatorPipe } from '../../common/validator/interface/validator.pipe';
import { RouteService } from './route.service';
import { ApiDecisionRq, ApiDecisionRs } from './rq-rs/decision';

@Controller('route')
@ApiTags('Route')
export class RouteController {
    constructor(private readonly routeService: RouteService) {}

    @ApiOperation({ summary: 'add target' })
    @ApiBody({ type: ApiDecisionRq })
    @ApiDefaultResponse({ type: ApiDecisionRs })
    @Post()
    async decision(@Body(ValidatorPipe) body: ApiDecisionRq): Promise<ApiDecisionRs> {
        return this.routeService.decision(body);
    }
}
