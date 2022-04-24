import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initApp } from '../config/initApp';
import { disposeApp } from '../config/disposeApp';
import * as mongoose from 'mongoose';

describe('Get target', () => {
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

    it('GET: ​/api/target => get valid target', async () => {
        const result = await agent.get(`/api/target/${targetId}`).set('Connection', 'keep-alive').expect(200);

        const res = result.body;
        if (!res) throw new BadRequestException('result is invalid!');
    });

    it('GET: ​/api/target => get invalid target', async () => {
        await agent.get(`/api/target/6263de6f234bf874e47bbc7d`).set('Connection', 'keep-alive').expect(404);
    });
});
