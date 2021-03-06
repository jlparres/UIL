'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WeaponSchema = Schema({
    name: String,
    description: String,
    adquisitionDate: Date,
    image: String,
    type: String,
    price: Number,      // Precio real nueva
    buyPrice: Number,   // Precio de compra
    sellPrice: Number,  // Precio de venta (segunda mano)
    currency: String,
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Weapon', WeaponSchema);

