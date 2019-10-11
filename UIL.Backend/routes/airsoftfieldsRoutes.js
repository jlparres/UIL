'use strict'
// Rutas de campos de AirSoft

var express = require('express')
var AirSoftFieldController = require('../controllers/airsoftfieldController');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

// Nombre de la ruta del API
// api.get('/users', mdAuth.ensureAuth, UserController.getUser);
// api.post('/register', UserController.saveUser);
// api.post('/login', UserController.login);

//DeleteById, UpdateById, ReplaceById, Add, GetFiltered, GetAll, GetById

api.get('/get-all', AirSoftFieldController.GetAll);
api.get('/get/:id', AirSoftFieldController.GetById);

api.post('/add', mdAuth.ensureAuth, AirSoftFieldController.Add);
api.patch('/update/:id', mdAuth.ensureAuth, AirSoftFieldController.UpdateById);
api.put('/replace/:id', mdAuth.ensureAuth, AirSoftFieldController.ReplaceById);
api.delete('/delete/:id', mdAuth.ensureAuth, AirSoftFieldController.DeleteById);

module.exports = api;

