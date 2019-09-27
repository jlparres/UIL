'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Clave_Secreta_D3_Un1d4d_Int3rvec10n_L1nc3';

// La peticion next es para que no se quede pendiente.
exports.ensureAuth = function(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: "La petición no tiene la cabecera de autenticación." });
    }
    
    // var token = req.headers.authorization.replace(/['"]+g, '');
    var token = req.headers.authorization;
    try
    {
        var payload = jwt.decode(token, secret);
        if(payload.sub && payload.exp <= moment().unix()) {
            return res.status(401).send({ message: "El token ha expirado." });
        }
    } catch(ex) {
        console.log("ex", ex);
        return res.status(404).send({ message: "Token no es valido." });
    }

    req.user = payload;

    next();
}