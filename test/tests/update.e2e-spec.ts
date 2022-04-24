import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initApp } from '../config/initApp';
import { disposeApp } from '../config/disposeApp';
import * as mongoose from 'mongoose';

describe('Update target', () => {
    let app: INestApplication;
    let agent;
    let targetId;
    beforeAll(async () => {
        app = await initApp();
        agent = request(app.getHttpServer());
        const target = await mongoose.connection.db.collection('target').findOne({ maxAcceptsPerDay: 10 });
        targetId = target._id.toHexString();
    }, 60000);

    afterAll(async () => {
        await disposeApp(app);
    }, 40000);

    it('PUT: ​/api/target => update valid target', async () => {
        const result = await agent
            .put(`/api/target/${targetId}`)
            .send({
                value: 0.5,
                maxAcceptsPerDay: 5,
                url: 'http://google.com',
                accept: {
                    geoState: ['ca', 'usa'],
                    hour: ['13', '14', '15'],
                },
            })
            .set('Connection', 'keep-alive')
            .expect(200);

        const res = result.body;
        if (!res.id) throw new BadRequestException('result is invalid!');
    });

    it('PUT: ​/api/target => update target by invalid url', async () => {
        await agent
            .put(`/api/target/${targetId}`)
            .send({
                value: 0.5,
                maxAcceptsPerDay: 5,
                url: 'google',
                accept: {
                    geoState: ['ca', 'usa'],
                    hour: ['13', '14', '15'],
                },
            })
            .set('Connection', 'keep-alive')
            .expect(400);
    });

    it('PUT: ​/api/target => update target by invalid url', async () => {
        await agent
            .put(`/api/target/${targetId}`)
            .send({
                value: 0.5,
                maxAcceptsPerDay: 5,
                url: 'www.google.com',
                accept: {
                    geoState: ['ca', 'usa'],
                    hour: ['13', '14', '15'],
                },
            })
            .set('Connection', 'keep-alive')
            .expect(400);
    });

    it('PUT: ​/api/target => update target by invalid url', async () => {
        await agent
            .put(`/api/target/${targetId}`)
            .send({
                value: 0.5,
                maxAcceptsPerDay: 5,
                url: 'google.com',
                accept: {
                    geoState: ['ca', 'usa'],
                    hour: ['13', '14', '15'],
                },
            })
            .set('Connection', 'keep-alive')
            .expect(400);
    });
});
