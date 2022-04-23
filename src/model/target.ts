import { BaseModel } from './base/base';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const TargetDB = 'Target';
@Schema({ versionKey: false, collection: 'target' })
export class TargetModel extends BaseModel {
    @Prop({ name: 'value', type: 'number', required: true })
    value: number;

    @Prop({ name: 'url', required: true })
    url: string;

    //it will be static
    @Prop({ name: 'maxAcceptsPerDay', type: 'number', required: true })
    maxAcceptsPerDay: number;

    //it will be updated
    @Prop({ name: 'name', type: 'number', required: true })
    maxAcceptsPerDayRemained: number;

    @Prop({
        required: false,
        type: raw({
            geoState: { required: false, type: [String] },
            hour: { required: false, type: [String] },
        }),
        _id: false,
    })
    accept: {
        geoState: string[];
        hour: string[];
    };
}

export const TargetSchema: mongoose.Schema = SchemaFactory.createForClass(TargetModel);

TargetSchema.pre('save', function () {
    this.set(this.isNew ? 'created' : 'updated', new Date());
});
