'use strict'
// Modulos y librerias
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

// Servicios
var jwt = require('../services/jwt');

// Modelos
var User = require('../models/user');


// Acciones
// GetAll
// GET https://localhost:3789/api/user
function GetAll(req, res, next) {
    User.find({}).exec((err, users) => {
        if(err) {
            res.status(500).send({ message: "Error en la petición." });
        }
        else {
            if(users) {
                res.status(200).send({ users });
            }
            else {
                res.status(404).send({ message: "No existen Usuarios." });
            }
        }
    });
}

function GetUserById(req, res) {
    //var userId = new ObjectId(req.params.id);
    var userId = req.params.id;
    
    User.findById(userId).exec((err, users) => {
        if(err) {
            res.status(500).send({ message: err.message, error: err });
        }
        else {
            if(users) {
                res.status(200).send({ users });
            }
            else {
                res.status(404).send({ message: "No exite el usuario buscado" });
            }
        }
    });
}

// Create
// POST https://localhost:3789/api/user/create
function Add(req, res) {
    var user = new User();

    // Recoger parametros de peticion
    var params = req.body;

    console.log(req.body);
    //console.log(req.name);

    // Asignar varlores al objeto Usuario
    if(params.password && params.name && params.surname && params.email && params.nick) {
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.nick = params.nick;
        user.image = '';

        User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
            if(err) {
                res.status(500).send({
                    message: "Error al comprobar el usuario."
                });
            } 
            else {
                if(!issetUser) {
                    // Cifrar contraseña
                    bcrypt.hash(params.password, null, null, function(err, hash) {
                        user.password = hash;
                        user.save((err, userStored) => {
                            if(err) {
                                res.status(500).send({
                                    message: "Error al guardar el Usuario."
                                });
                            }
                            else {
                                if(!userStored) {
                                    res.status(404).send({
                                        message: "No se ha registrado el usuario"
                                    });
                                }
                                else {
                                    res.status(200).send({ user: userStored });
                                }
                            }
                        });
                    });
                }
                else {
                    res.status(404).send({
                        message: "El usuario ya exite."
                    });
                }
            }
        });
    }
    else {
        res.status(200).send({ message: "Lo datos introducidos son incorrectos." });
    }
}

// Login
// POST https://localhost:3789/api/user/login
function Login(req, res) {
    var params = req.body;

    var email = params.email;
    var pass = params.password;

    console.log("Email", email);
    console.log("Password", pass);
    console.log("GetToken", params.getToken);

    User.findOne({ email: params.email.toLowerCase() }, (err, user) => {
        if(err) {
            console.log("err", err);
            res.status(500).send({ message: "Error al buscar el Usuario." });
        } 
        else {
            if(user) {
                bcrypt.compare(pass, user.password, (err, check) => {
                    if(err) {
                        console.log("error", err);
                        res.status(404).send({
                            message: "Error al validar usuario."
                        });
                    } 
                    else {
                        if(check) {
                            // Comprobar y generar el Token
                            if(params.getToken) {
                                // Devolver el token en JWT
                                var token = jwt.createToken(user);
                                res.status(200).send({ token: token });
                            } else {
                                res.status(200).send({ user: user });    
                            }
                        }
                        else {
                            res.status(200).send({ message: "Usuario o contraseña incorrecto." });
                        }
                    }
                });
            } 
            else {
                res.status(404).send({ message: "El usuario no existe." });
            }
        }
    });
}

// Update
// PATCH https://localhost:3789/api/user/update/:id
function UpdateById(req, res) {
    var userId = req.params.id;
    var update = req.body;
    console.log("req", req.user);
    // Solo permitimos actualizar al usuario logeado.
    if(userId != req.user.sub) {
        return res.status(500).send({ message: "No tienes permiso para actualizar el usuario."});
    }
    else {
        User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
            if(err) {
                res.status(500).send({ message: "Error al actualizar el usuario."});
            }
            else {
                if(!userUpdated) {
                    res.status(404).send({ message: "No se ha podido actualizar el usuario."});
                }
                else {
                    res.status(200).send({message: "Usuario actualizado correctamente", Usuario: userUpdated});
                }
            }
        });
    }

    //res.status(400).send({ message: "Usuario incorrecto."});
    //res.status(200).send({ message: "Actualizar usuario."});
}


function uploadImage(req, res) {
    var userId = req.params.id;
    var fileName = 'No subido...';
    
    console.log("UserId", userId);
    console.log("req.User.Id", req.user.sub);

    if(req.files) {
        var filePath = req.files.image.path;
        //var fileSplit = filePath.split('\\');
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[2];
        var fileExt = fileName.split('\.')[1];
        
        // res.status(200).send({ "filePath": filePath, "fileSplit": fileSplit, "fileName": fileName, "fileExt": extSplit });

        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
            
            if(userId != req.user.sub) {
                return res.status(500).send({ message: "No tienes permiso para actualizar el usuario."});
            }
            
            User.findByIdAndUpdate(userId, { image: fileName }, { new:true }, (err, userUpdated) => {
                if(err) {
                    res.status(500).send({ message: "Error al actualizar el usuario." });
                }
                else {
                    if(!userUpdated) {
                        res.status(404).send({ message: "No se ha podido actualizar el usuario." });
                    }
                    else {
                        res.status(200).send({ message: "Usuario actualizado correctamente.", Usuario: userUpdated, image: fileName });
                    }
                }
            });
        } else {
            fs.unlink(filePath, (err) => {
                if(err) {
                    res.status(404).send({ message: "Extensión válida y fichero no borrado." });
                } else {
                    res.status(404).send({ message: "Extensión no válida." });
                }
            });
        }
    }
    else {
        res.status(200).send({ message: "No se han subido ficheros." });
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/' + imageFile;

    fs.exists(pathFile, function(exist) {
        if(exist) {
            res.sendFile(path.resolve(pathFile));
        }
        else {
            res.status(404).send({ message: "La imagen no existe." });
        }
    });

    // res.status(200).send({ message: "getImageFile" });
}

function GetAdmins(req, res) {
    User.find({ role: 'ROLE_ADMIN' }).exec((err, users) => {
        if(err) {
            res.status(500).send({ message: "Error en la petición." });
        }
        else {
            if(users) {
                res.status(200).send({ users });
            }
            else {
                res.status(404).send({ message: "No existen Admins" });
            }
        }
    });
    // res.status(200).send({ message: "getAdmins" });
}

// Delete
// DEL https://localhost:3789/api/user/delete/:id
function DeleteById(req, res) {
    var itemId = req.params.id;
    res.send('Delete ' + itemId);
    console.log('Delete ' + itemId);    
    res.status(200).send({ message: "DeleteById" });
}


// Exports
module.exports = {
    GetAll, Add, GetUserById, Login, UpdateById, uploadImage, getImageFile, GetAdmins, DeleteById
};
