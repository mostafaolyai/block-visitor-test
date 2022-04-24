import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//.env config
import * as dotenv from 'dotenv';
import { TargetModule } from './api/target/target.module';
import { RouteModule } from './api/route/route.module';
dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb://${process.env.mongo_server}/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ignoreUndefined: true,
            user: process.env.mongo_user,
            pass: process.env.mongo_pass,
            dbName: process.env.mongo_database,
            connectionName: process.env.mongo_main_db,
        }),
        TargetModule,
        RouteModule,
    ],
    providers: [],
    controllers: [],
})
export class AppModule {}
