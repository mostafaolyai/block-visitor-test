import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TargetDB, TargetSchema } from '../../model/target';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: TargetDB, schema: TargetSchema }])],
    controllers: [TargetController],
    providers: [TargetService],
})
export class TargetModule {}
