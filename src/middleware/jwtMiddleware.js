const JwtAuthentication = require("../modules/auth/jwtValidation");
const BadRequest = require("../errors/BadRequest");
const jwtAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization && !authorization.startsWith("Bearer ")) {
        throw new BadRequest("Gagal mengauthentikasi!");
    }
    const verifyJsonwebtoken = authorization.split(" ")[1];
    try {
        const decodeJsonWebToken = JwtAuthentication.verify(verifyJsonwebtoken);
        req.user = decodeJsonWebToken;
        req.userId = decodeJsonWebToken.id;
        console.log(req.userId);
        console.log(decodeJsonWebToken)
        next();
    } catch (error) {
        console.log(error);
        throw new BadRequest("Gagal mengverify json web token");
    }
};
module.exports = jwtAuth;
