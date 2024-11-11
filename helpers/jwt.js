const jwt = require('jsonwebtoken');

let secret_key = process.env.SECRET_KEY;


const signPayload = (payload) => {
    return jwt.sign(payload, secret_key);
}

const verifyToken = (token) => {

    return jwt.verify(token, secret_key);
}

module.exports = {
    signPayload,
    verifyToken
}