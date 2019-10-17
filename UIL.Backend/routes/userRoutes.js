'use strict'

var express = require('express')
var UserController = require('../controllers/userController');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/users' });

// Nombre de la ruta del API
api.get('/admins', mdAuth.ensureAuth, UserController.GetAdmins);
api.get('/get-all', mdAuth.ensureAuth, UserController.GetAll);
api.get('/get/:id', mdAuth.ensureAuth, UserController.GetUserById);

api.post('/login', UserController.Login);

api.post('/register', UserController.Add);
api.delete('/delete/:id', mdAuth.ensureAuth, UserController.DeleteById);
api.patch('/update/:id', mdAuth.ensureAuth, UserController.UpdateById);

api.post('/upload-img-user/:id', [ mdAuth.ensureAuth, mdUpload ], UserController.uploadImage);
api.get('/get-image-file/:imageFile', UserController.getImageFile);


module.exports = api;

/* CRUD por defecto
api.get('/get-all', GameController.GetAll);
api.get('/get/:id', GameController.GetById);
api.post('/add', mdAuth.ensureAuth, GameController.Add);
api.patch('/update/:id', mdAuth.ensureAuth, GameController.UpdateById);
api.put('/replace/:id', mdAuth.ensureAuth, GameController.ReplaceById);
api.delete('/delete/:id', mdAuth.ensureAuth, GameController.DeleteById);
*/
