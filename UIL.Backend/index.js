'use strict'

// Declaracion de variables 
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789; // Lanzar la app en un puerto concreto

// Conectar a la base de datos de MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UIL', { useMongoClient: true })
    .then(() => {
        console.log("Conexión a basae de datos UIL correctamente."); 
        app.listen(port, () => {
            console.log("El servidor está online en la url: http://localhost:3789");
        });
    }).catch(err => console.log(err));
// 
