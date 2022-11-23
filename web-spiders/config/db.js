const { connect } = require('mongoose');
const { MONGODB_CLOUD, MONGODB_LOCAL, NODE_ENV } = require("./index")
const { success, error, info } = require("consola")

let connectDB = async () => {
    try {
        if (NODE_ENV === 'development') {
            await connect(MONGODB_LOCAL);
            success("Local database connected")
        } else {
            await connect(MONGODB_CLOUD);
            success("Cloud database connected")
        }
    } catch (err) {
        error(err)
    }
};

module.exports = connectDB