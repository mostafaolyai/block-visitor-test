import * as mongoose from 'mongoose';

module.exports = async () => {
    try {
        // console.log('teardown');
        await mongoose.connection.close(true);
        await mongoose.disconnect();
    } catch (e) {
        // console.log(e);
    }
};
