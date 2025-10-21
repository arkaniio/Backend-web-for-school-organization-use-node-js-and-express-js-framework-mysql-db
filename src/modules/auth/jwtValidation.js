const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");
class JwtAuthentication {
    sign(payload) {
        return jwt.sign(payload, config.jwt.secret, { expiresIn: "7d" });
    }
    verify(tokenAuth) {
        return jwt.verify(tokenAuth, config.jwt.secret);
    }
}
module.exports = new JwtAuthentication();
