import { TestingModule } from '@nestjs/testing';

export async function disposeModule(module: TestingModule): Promise<void> {
    // console.log('dispose app');
    try {
        if (module) await module.close();
    } catch (e) {
        // console.error(e);
    }
}
