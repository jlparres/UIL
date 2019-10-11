'use strict'
// Modulos y librerias
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
moment.locale('es');

// Servicios
var jwt = require('../services/jwt');

// Modelos
var Weapon = require('../models/weapon');

// Acciones
function getWeapons(req, res) {
    res.status(200).send({
        message: 'getWeapons', Usuario: req.user
    });
}

// GetAll
// GET https://localhost:3789/api/weapon
function GetAll(req, res, next) {
    if(req.query.filter) {
        next();
        return;
    }
    
    Weapon.find({}).populate({ path: 'user' }).exec(function(err, weapons) {
        if(err) {
            res.status(500).send({ messgae: "Error al hacer la petición." });
        }
        else {
            if(weapons) {
                res.status(200).send({ Weapons: weapons });
            }
            else {
                res.status(404).send({ messgae: "No hay armas que mostrar." });
            }
        }
    });
}

// GetById
// GET https://localhost:3789/api/weapon/:id
function GetById(req, res) {
    var itemId = req.params.id;

    Weapon.findById(itemId).populate({ path: 'user' }).exec((err, weapon) => {
        if(err) {
            res.status(500).send({ messgae: "Error al hacer la petición." });
        }
        else {
            if(weapon) {
                res.status(200).send({ Weapon: weapon });
            }
            else {
                res.status(404).send({ messgae: "No hay armas que mostrar." });
            }
        }
    });
}

// GetFiltered
// GET https://localhost:3789/api/weapon?filter=filtro
function GetFiltered(req, res) {
    var filter = req.query.filter;
    res.send('Get filter ' + filter);
    console.log('Get filter ' + filter);
    res.status(200).send({ message: "GetFiltered" });
}

// Create
// POST https://localhost:3789/api/weapon/create
function Add(req, res) {
    var data = req.body;
    var weapon = new Weapon();
    console.log(req.body);

    var fecha = data.adquisitionDate ? moment(data.adquisitionDate, 'DD/MM/YYYY', true).format() : moment().format('DD/MM/YYYY');
    console.log("fecha", fecha);

    if(data && data.name && data.description && data.type) {
        weapon.name = data.name;
        weapon.description = data.description;
        weapon.adquisitionDate = new Date(fecha);
        // weapon.image = data.image;
        weapon.type = data.type;
        weapon.price = data.price;
        weapon.buyPrice = data.buyPrice;
        weapon.sellPrice = data.sellPrice;
        weapon.currency = data.currency;

        weapon.user = data.user;

        weapon.save((err, weaponStore) => {
            if(err) {
                res.status(500).send({ message: "Error al insertar." });
            }
            else {
                if(weaponStore) {
                    res.status(200).send({ message: "Inserción correcta.", weapon: weaponStore });
                }
                else {
                    res.status(404).send({ message: "No se ha guardado el arma." });
                }
            }
        });
    }
    else {
        res.status(500).send({
            message: "Nombre, descripción, precio y tipo son obligatorios."
        });
    }
}

// Replace
// PUT https://localhost:3789/api/weapon/replace/:id
function ReplaceById(req, res) {
    var itemId = req.params.id;
    var data = req.body.data;
    res.send('Replace ' + itemId + ' with ' + data);
    console.log('Replace ' + itemId + ' with ' + data);
    res.status(200).send({ message: "Replace" });
}

// Update
// PATCH https://localhost:3789/api/weapon/update/:id
function UpdateById(req, res) {
    var itemId = req.params.id;
    var data = req.body;

    if(data) {
        Weapon.findByIdAndUpdate(itemId, data, { new: true }, (err, weaponUpdated) => {
            if(err) {
                res.status(500).send({ message: "Error al insertar." });
            }
            else {
                if(weaponUpdated) {
                    res.status(200).send({ message: "Actualización correcta.", weapon: weaponUpdated });
                }
                else {
                    res.status(404).send({ message: "No se ha guardado el arma." });
                }
            }
        });
    }
    else {
        res.status(500).send({ message: "Debe incluir algún campo para actualizar." });
    }
}

// Delete
// DEL https://localhost:3789/api/weapon/:id
function DeleteById(req, res) {
    var itemId = req.params.id;
    res.send('Delete ' + itemId);
    console.log('Delete ' + itemId);    
    res.status(200).send({ message: "DeleteById" });
}



module.exports = { getWeapons, DeleteById, UpdateById, ReplaceById, Add, GetFiltered, GetAll, GetById };