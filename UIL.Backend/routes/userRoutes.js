'use strict'

var express = require('express')
var UserController = require('../controllers/userController');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

// Nombre de la ruta del API
api.get('/users', mdAuth.ensureAuth, UserController.getUser);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;

