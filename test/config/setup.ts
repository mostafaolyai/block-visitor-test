// don't move this file
require('./config');
import * as mongoose from 'mongoose';
import { getMongoConfig } from './mongo';

module.exports = async () => {
    // console.log('config');
    try {
        const { mongoUri, mongoConfig } = getMongoConfig();
        // connect to mongo
        await mongoose.connect(mongoUri, mongoConfig);
        await mongoose.connection.dropDatabase();
    } catch (e) {
        // console.log(e);
    }
    try {
        await mongoose.connection.close(true);
        await mongoose.disconnect();
        return new Promise<void>((resolve) => {
            setTimeout(resolve, 2000);
        });
    } catch (e) {
        // console.log(e);
    }
};
