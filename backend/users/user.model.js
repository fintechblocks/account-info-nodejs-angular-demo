const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },   
    createdDate: { type: Date, default: Date.now },
    refreshToken: {type: String},
    accessToken: {type: String},
    accountRequestId: {type: String},
    state: {type: String},
    nonce: {type: String}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);