require('./config');
import { getMongoConfig } from './mongo';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

export async function initApp(): Promise<INestApplication> {
    // console.log('init app');
    let app: INestApplication = null;
    try {
        // mongoose
        const { mongoUri, mongoConfig } = getMongoConfig();
        // Create test module
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        // create nest application
        app = module.createNestApplication();

        // connect to mongo
        await mongoose.connect(mongoUri, mongoConfig);

        const user = await mongoose.connection.db.collection('target').findOne({ maxAcceptsPerDay: 10 });

        if (!user) {
            await mongoose.connection.db.collection('target').insertMany([
                {
                    value: 0.5,
                    url: 'http://google.com',
                    maxAcceptsPerDay: 10,
                    maxAcceptsPerDayRemained: 10,
                    accept: {
                        geoState: ['ca', 'usa'],
                        hour: ['13', '14', '15'],
                    },
                    created: new Date(),
                },
                {
                    value: 0.5,
                    url: 'http://google.com',
                    maxAcceptsPerDay: 10,
                    maxAcceptsPerDayRemained: 0,
                    accept: {
                        geoState: ['ca', 'usa'],
                        hour: ['13', '14', '15'],
                    },
                    created: new Date(),
                },
            ]);
        }
        await app.init();
    } catch (e) {
        // console.error(e);
    }
    return app;
}
