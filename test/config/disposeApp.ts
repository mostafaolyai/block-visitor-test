import { INestApplication } from '@nestjs/common';

export async function disposeApp(app: INestApplication): Promise<void> {
    // console.log('dispose app');
    try {
        if (app) await app.close();
    } catch (e) {
        // console.error(e);
    }
}
