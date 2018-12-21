const mongoose = require('mongoose');
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;
mongoose.connect(MONGO_CONNECTION);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};