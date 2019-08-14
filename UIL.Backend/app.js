'use strict'
// Configuracion basica

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas
var user_routes = require('./routes/userRoutes');

// Middlewares Body-Parser
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Configurar cabeceras y CORS

// Rutas base
app.use('/api', user_routes);

// Rutas body-parser

// Exportar el modulo

module.exports = app;




