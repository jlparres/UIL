'use strict'

var express = require('express')
var WeaponController = require('../controllers/weaponController');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/weapons' });

// Nombre de la ruta del API
api.get('/get-weapons', mdAuth.ensureAuth, WeaponController.getWeapons);

module.exports = api;

