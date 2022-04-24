import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initApp } from '../config/initApp';
import { disposeApp } from '../config/disposeApp';
import * as mongoose from 'mongoose';

describe('Decision', () => {
    let app: INestApplication;
    let agent;
    let remainedTarget;
    let zeroTarget;

    let target1;
    beforeAll(async () => {
        app = await initApp();
        agent = request(app.getHttpServer());

        target1 = await mongoose.connection.db.collection('target').findOne({ url: 'http://yahoo.com' });
        remainedTarget = target1._id.toHexString();

        const target2 = await mongoose.connection.db.collection('target').findOne({ url: 'http://google.com' });
        zeroTarget = target2._id.toHexString();
    }, 60000);

    afterAll(async () => {
        await disposeApp(app);
    }, 40000);

    it('POST: /route => accepted', async () => {
        const result = await agent
            .post(`/route`)
            .send({
                geoState: 'ca',
                publisher: 'abc',
                timestamp: '2021-07-19T13:28:59.513Z',
            })
            .set('Connection', 'keep-alive')
            .expect(201);

        const res = result.body;
        if (res.decision !== 'ACCEPTED') throw new BadRequestException('result is invalid!');

        const target1AfterAccepting = await mongoose.connection.db.collection('target').findOne({ url: 'http://yahoo.com' });

        if (target1AfterAccepting.maxAcceptsPerDayRemained === target1.maxAcceptsPerDayRemained)
            throw new BadRequestException('result is invalid!');
    });

    it('POST: /route => rejected by geo', async () => {
        const result = await agent
            .post(`/route`)
            .send({
                geoState: 'af',
                publisher: 'abc',
                timestamp: '2021-07-19T13:28:59.513Z',
            })
            .set('Connection', 'keep-alive')
            .expect(201);

        const res = result.body;
        if (res.decision !== 'REJECTED') throw new BadRequestException('result is invalid!');
    });

    it('POST: /route => rejected by hour', async () => {
        const result = await agent
            .post(`/route`)
            .send({
                geoState: 'ir',
                publisher: 'abc',
                timestamp: '2021-07-19T20:28:59.513Z',
            })
            .set('Connection', 'keep-alive')
            .expect(201);

        const res = result.body;
        if (res.decision !== 'REJECTED') throw new BadRequestException('result is invalid!');
    });

    it('POST: /route => rejected by accepted count', async () => {
        const result = await agent
            .post(`/route`)
            .send({
                geoState: 'ir',
                publisher: 'abc',
                timestamp: '2021-07-19T13:28:59.513Z',
            })
            .set('Connection', 'keep-alive')
            .expect(201);

        const res = result.body;
        if (res.decision !== 'REJECTED') throw new BadRequestException('result is invalid!');
    });
});
