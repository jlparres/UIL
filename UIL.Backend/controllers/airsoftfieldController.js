'use strict'
// Controller de campos de AirSoft
// Modulos y librerias

// Servicios
var jwt = require('../services/jwt');

// Modelos
var AirsoftField = require('../models/airsoftfield');

// GetAll
// GET https://localhost:3789/api/arisoftfield
function GetAll(req, res, next) {
    if(req.query.filter) {
        next();
        return;
    }
    res.send('Get all');
    console.log('Get all');
    res.status(200).send({ message: "GetAll" });
}

// GetById
// GET https://localhost:3789/api/arisoftfield/:id
function GetById(req, res, next) {
    var itemId = req.params.id;
    res.send('Get ' + req.params.id);
    console.log('Get ' + req.params.id);
    res.status(200).send({ message: "GetById" });
}

// GetFiltered
// GET https://localhost:3789/api/arisoftfield?filter=filtro
function GetFiltered(req, res) {
    var filter = req.query.filter;
    res.send('Get filter ' + filter);
    console.log('Get filter ' + filter);
    res.status(200).send({ message: "GetFiltered" });
}

// Create
// POST https://localhost:3789/api/arisoftfield
function Add(req, res) {
    var data = req.body.data;
    res.send('Add ' + data);
    console.log('Add ' + data);
    res.status(200).send({ message: "Createarisoftfield" });
}

// Replace
// PUT https://localhost:3789/api/arisoftfield/replace/:id
function ReplaceById(req, res) {
    var itemId = req.params.id;
    var data = req.body.data;
    res.send('Replace ' + itemId + ' with ' + data);
    console.log('Replace ' + itemId + ' with ' + data);
    res.status(200).send({ message: "Replace" });
}

// Update
// PATCH https://localhost:3789/api/arisoftfield/update/:id
function UpdateById(req, res) {
    var itemId = req.params.id;
    var data = req.body.data;
    res.send('Update ' + itemId + ' with ' + data);
    console.log('Update ' + itemId + ' with ' + data);
    res.status(200).send({ message: "UpdateById" });
}

// Delete
// DEL https://localhost:3789/api/arisoftfield/:id
function DeleteById(req, res) {
    var itemId = req.params.id;
    res.send('Delete ' + itemId);
    console.log('Delete ' + itemId);    
    res.status(200).send({ message: "DeleteById" });
}

// Exports
module.exports = {
    DeleteById, UpdateById, ReplaceById, Add, GetFiltered, GetAll, GetById
};


