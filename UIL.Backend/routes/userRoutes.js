'use strict'

var express = require('express')
var UserController = require('../controllers/userController');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/users' });

// Nombre de la ruta del API
api.get('/admins', UserController.getAdmins);
api.get('/users', mdAuth.ensureAuth, UserController.getUsers);
api.get('/:id', mdAuth.ensureAuth, UserController.getUserById);

api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', mdAuth.ensureAuth, UserController.udpateUser);
api.post('/upload-img-user/:id', [ mdAuth.ensureAuth, mdUpload ], UserController.uploadImage);
api.get('/get-image-file/:imageFile', UserController.getImageFile);

module.exports = api;

