const { verifyToken } = require("../helpers/jwt");

module.exports = async function Authentication(req, res, next) {
    try {
        let { authorization } = req.headers;
        if (!authorization) {
            throw { status: 401, name: "unauthorized" }
        }

        let [Bearer, token] = authorization.split(" ");

        let payload = verifyToken(token);
        if (!payload) {
            throw { status: 401, name: "InvalidToken" }
        }

        req.user = payload;
        next();
    } catch (error) {
        next(error)
    }
}