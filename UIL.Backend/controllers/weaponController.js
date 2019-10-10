'use strict'
// Modulos y librerias
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

// Servicios
var jwt = require('../services/jwt');

// Modelos
var Weapon = require('../models/weapon');

// Acciones
function getWeapons(req, res) {
    res.status(200).send({
        message: 'getWeapons', Usuario: req.user
    });
}


module.exports = { getWeapons };