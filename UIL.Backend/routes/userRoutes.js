'use strict'

var express = require('express')
var UserController = require('../controllers/userController');

var api = express.Router();

// Nombre de la ruta del API
api.get('/users', UserController.getUser);
api.post('/register', UserController.saveUser);

module.exports = api;

