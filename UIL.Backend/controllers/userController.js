'use strict'
// Modulos y librerias
var bcrypt = require('bcrypt-nodejs');

// Modelos
var User = require('../models/user');


// Acciones
function getUser(req, res) {
    res.status(200).send({
        message: 'Probando el controlador getUser'
    });
}

function saveUser(req, res) {
    var user = new User();

    // Recoger parametros de peticion
    var params = req.body;

    console.log(req);

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

// Exports
module.exports = {
    getUser, saveUser
};
