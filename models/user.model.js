const mongoose = require('mongoose');
const uniqid  = require('uniqid');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 30,
        min: 8
    },
    username: {
        type: String,
        required: true,
        default: uniqid(),
        unique: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    googleID: {
        type: String
    },
    googleAvatar: {
        type: String
    },
    registerType: {
        type: String,
        default: 'email'
    },
    verificationCode:{
        type: String
    },
    passwordResetCode: {
        type: String
    }

});
var User = mongoose.model('user', UserSchema);
module.exports = User;

//module.exports = User = mongoose.model('user', UserSchema);