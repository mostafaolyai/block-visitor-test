import * as dotenv from 'dotenv';
// config .env
dotenv.config();

// set database in environment
if (process.env.mongo_database) {
    process.env.mongo_database = process.env.mongo_database.endsWith('-test')
        ? process.env.mongo_database
        : process.env.mongo_database + '-test';
}
require('../../src/common/plugins/mongoose.plugin');
