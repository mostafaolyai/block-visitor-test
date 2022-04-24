import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initApp } from '../config/initApp';
import { disposeApp } from '../config/disposeApp';

describe('Add target', () => {
    let app: INestApplication;
    let agent;
    beforeAll(async () => {
        app = await initApp();
        agent = request(app.getHttpServer());
    }, 60000);

    afterAll(async () => {
        await disposeApp(app);
    }, 40000);

    it('POST: ​/api/target => add valid target', async () => {
        const result = await agent
            .post(`/api/target`)
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
            .expect(201);

        const res = result.body;
        if (!res.id) throw new BadRequestException('result is invalid!');
    });

    it('POST: ​/api/target => add target by invalid url', async () => {
        await agent
            .post(`/api/target`)
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

    it('POST: ​/api/target => add target by invalid url', async () => {
        await agent
            .post(`/api/target`)
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

    it('POST: ​/api/target => add target by invalid url', async () => {
        await agent
            .post(`/api/target`)
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
