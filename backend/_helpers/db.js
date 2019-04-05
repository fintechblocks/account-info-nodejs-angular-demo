const mongoose = require('mongoose');
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;
mongoose.connect(MONGO_CONNECTION).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};