'use strict'

var express = require('express')
var WeaponController = require('../controllers/weaponController');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var mdAdmin = require('../middlewares/isAdmin');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/weapons' });


// Nombre de la ruta del API
api.get('/get-weapons', mdAuth.ensureAuth, WeaponController.getWeapons);

api.get('/get-all', WeaponController.GetAll);
api.get('/get/:id', WeaponController.GetById);

api.post('/add', [mdAuth.ensureAuth, mdAdmin.isAdmin], WeaponController.Add);
api.patch('/update/:id', mdAuth.ensureAuth, WeaponController.UpdateById);
api.put('/replace/:id', mdAuth.ensureAuth, WeaponController.ReplaceById);
api.delete('/delete/:id', mdAuth.ensureAuth, WeaponController.DeleteById);

api.post('/upload-img-weapon/:id', [ mdAuth.ensureAuth, mdUpload ], WeaponController.UploadImage);
api.get('/get-image-file/:imageFile', WeaponController.GetImageFile);

module.exports = api;

