let jwt = require('jsonwebtoken');
const { development } = require('../config/config');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['Authorization'];
     console.log(token)
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, development.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                })
            }
            else {
                req.decoded = decoded;
                console.log(req.decoded);
                next();
            }
        })
    }
    else {
        res.json({
            success: false,
            message: 'Authorization token is not supplied'
        });
    }
}

let generateToken = (data) => {
    console.log({ data });
    const payload = { user: data.Email };
    const options = { expiresIn: '1m' };
    const secret = development.secret;
    let token = jwt.sign(payload, secret, options);
    return { payload, token, options };
}

module.exports = {
    checkToken,
    generateToken
}