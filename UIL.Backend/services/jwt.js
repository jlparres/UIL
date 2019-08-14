'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Clave_Secreta_D3_Un1d4d_Int3rvec10n_L1nc3';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        nick: user.nick,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    console.log("payload", payload);
    return jwt.encode(payload, secret);
};





