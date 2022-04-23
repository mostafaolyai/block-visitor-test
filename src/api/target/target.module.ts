import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaginationModule } from '../../applicaton/pagination/pagination.module';
import { TargetDB, TargetSchema } from '../../model/target';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: TargetDB, schema: TargetSchema }]), PaginationModule],
    controllers: [TargetController],
    providers: [TargetService],
})
export class TargetModule {}
