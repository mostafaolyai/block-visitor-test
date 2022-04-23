import * as mongoose from 'mongoose';

export function getMongoConfig(): { mongoUri: string; mongoConfig: any } {
    // mongoose
    const mongoUri = `mongodb://${process.env.mongo_server}/`;
    const mongoConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
        user: process.env.mongo_user,
        pass: process.env.mongo_pass,
        dbName: process.env.mongo_database,
        connectionName: process.env.mongo_main_db,
    };
    return {
        mongoConfig,
        mongoUri,
    };
}
