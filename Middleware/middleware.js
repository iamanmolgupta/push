let jwt = require('jsonwebtoken');
const { development } = require('../config/config');

const httpStatus = require("http-status");

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, development.secret, (err, decoded) => {
            if (err) {
                return res.status(httpStatus.UNAUTHORIZED).json(err);
            }
            else {
                // console.log("tokenn inside token---",token)
                // req.decoded = decoded;
                // console.log(req.decoded);
                next();
            }
        })
    }
    else {
       return res.status(httpStatus.NETWORK_AUTHENTICATION_REQUIRED).json({error: "TOKEN REQUIRED"})
    }
}

let generateToken = (data) => {
    console.log({ data });
    const payload = { user: data.Email };
    const options = { expiresIn: '50s' };
    const secret = development.secret;
    let token = jwt.sign(payload, secret, options);
    return { payload, token, options };
}

module.exports = {
    checkToken,
    generateToken
}