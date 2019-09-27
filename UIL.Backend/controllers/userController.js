'use strict'
// Modulos y librerias
var bcrypt = require('bcrypt-nodejs');

// Servicios
var jwt = require('../services/jwt');

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

function login(req, res) {
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

// Exports
module.exports = {
    getUser, saveUser, login
};
