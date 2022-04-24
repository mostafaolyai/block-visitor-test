import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initApp } from '../config/initApp';
import { disposeApp } from '../config/disposeApp';
import * as mongoose from 'mongoose';

describe('Get target list', () => {
    let app: INestApplication;
    let agent;
    beforeAll(async () => {
        app = await initApp();
        agent = request(app.getHttpServer());
    }, 60000);

    afterAll(async () => {
        await disposeApp(app);
    }, 40000);

    it('GET: ​/api/target => get valid target', async () => {
        const result = await agent.get(`/api/target`).set('Connection', 'keep-alive').expect(200);

        const res = result.body;
        if (res.length > 0) throw new BadRequestException('result is invalid!');
    });
});
