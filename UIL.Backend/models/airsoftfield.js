'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Clase de campos de AirSoft
var AirSoftFieldSchema = Schema({
    name: String,
    province: String,
    City: String,
    Location: String, // Localidad
    Direction: String,
    CP: String,
    URL: String,
    CoordX: String,
    CoordY: String,
    image: String
});

module.exports = mongoose.model('AirSoftField', AirSoftFieldSchema);