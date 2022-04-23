import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
    constructor(private readonly title: string, private readonly canBeNull?: boolean) {}

    transform(ID: string): Types.ObjectId {
        if (Types.ObjectId.isValid(ID)) return new Types.ObjectId(ID);
        else if (this.canBeNull) return null;

        throw new BadRequestException(`${this.title} is not valid`);
    }
}
