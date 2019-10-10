'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = Schema({
    name: String,
    description: String,
    gameDateStart: Date,
    gameDateEnd: Date,
    email: String,
    price: Number,
    image: String,
    active: Boolean,
    airsoftfield: { type: Schema.ObjectId, ref: 'AirSoftField' }
});

module.exports = mongoose.model('Game', GameSchema);