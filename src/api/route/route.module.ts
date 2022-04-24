import { Module } from '@nestjs/common';
import { TargetModule } from '../target/target.module';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
    imports: [TargetModule],
    controllers: [RouteController],
    providers: [RouteService],
})
export class RouteModule {}
