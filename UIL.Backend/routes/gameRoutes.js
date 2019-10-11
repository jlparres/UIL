'use strict'
// Rutas de campos de AirSoft

var express = require('express')
var GameController = require('../controllers/gameController');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

// Nombre de la ruta del API
// api.get('/users', mdAuth.ensureAuth, UserController.getUser);
// api.post('/register', UserController.saveUser);
// api.post('/login', UserController.login);

//DeleteById, UpdateById, ReplaceById, Add, GetFiltered, GetAll, GetById

api.get('/get-all', GameController.GetAll);
api.get('/get/:id', GameController.GetById);

api.post('/add', mdAuth.ensureAuth, GameController.Add);
api.patch('/update/:id', mdAuth.ensureAuth, GameController.UpdateById);
api.put('/replace/:id', mdAuth.ensureAuth, GameController.ReplaceById);
api.delete('/delete/:id', mdAuth.ensureAuth, GameController.DeleteById);

module.exports = api;