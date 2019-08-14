'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    suername: String,
    email: String,
    password: String,
    role: String,
    nick: String
});

module.exports = mongoose.model('User', UserSchema);


