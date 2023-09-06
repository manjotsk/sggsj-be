const mongoose = require('mongoose')
const { Schema, } = require('mongoose');

const verification = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'users',
    },
    uniqueString: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    expireAt: { type: Date },
});
module.exports = mongoose.model("emailVeification", verification)