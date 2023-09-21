const mongoose = require('mongoose')
const { Schema, } = require('mongoose');

const resetPassword = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'users',
    },
    email: {
        type: String,
        required: true,
        ref: 'users'
    },
    token: {
        type: String,
        required: true,
    },
    expireAt: { type: Date },
});
module.exports = mongoose.model("PasswordReset", resetPassword)