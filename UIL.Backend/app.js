'use strict'
// Configuracion basica

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas
var user_routes = require('./routes/userRoutes');
var game_routes = require('./routes/gameRoutes');
var airsoft_routes = require('./routes/airsoftfieldsRoutes');

var weapon_routes = require('./routes/weaponRoutes');

// Middlewares Body-Parser
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Configurar cabeceras y CORS

// Rutas base
app.use('/api/user', user_routes);
app.use('/api/game', game_routes);
app.use('/api/airsoft', airsoft_routes);
app.use('/api/weapon', weapon_routes);

// Rutas body-parser

// Exportar el modulo

module.exports = app;







