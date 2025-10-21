const AuthUser = require("./auth.model");
const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const BadRequest = require("../../errors/BadRequest.js");
const JwtAuthentication = require("./jwtValidation.js");
class AuthService {
    constructor() {
        this.SALT_ROUND = 10;
    }
    async Register({ name, password, email, role }) {
        const confirmTheEmail = await User.findOne({
            where: { email },
        });
        const HashPassword = await bcrypt.hash(password, this.SALT_ROUND);
        if (confirmTheEmail) {
            throw new BadRequest("Email sudah terdaftar!");
        }
        const createTheNewUser = await User.create({
            name,
            password: HashPassword,
            email,
            role,
        });
        if (!createTheNewUser) {
            throw new BadRequest("Gagal membuat registrasi");
        }
        const jwtAuth = JwtAuthentication.sign({
            id: createTheNewUser.id,
            email: createTheNewUser.email,
        });
        delete createTheNewUser.password;
        return {
            createTheNewUser,
            jwtAuth
        };
    }
    async Login({ email, password }) {
        const verifyTheEmail = await User.findOne({
            where: { email, role },
        });
        if (!verifyTheEmail) {
            throw new BadRequest("Tidak dapat menemukan email user!");
        }
        const compareThePassword = await bcrypt.compare(
            password,
            verifyTheEmail.password
        );
        if (!compareThePassword) {
            throw new BadRequest("Password belum diisi!");
        }
        const jwtTokenLogin = JwtAuthentication.sign({
            id: verifyTheEmail.id,
            email: verifyTheEmail.email,
        });
        const LoginJson = verifyTheEmail.toJSON();
        delete LoginJson.password;
        return { LoginJson, jwtTokenLogin };
    }
    async GetProfile(userId) {
        const getProfile = await User.findByPk(userId);
        return getProfile.toJSON();
    }
}
module.exports = new AuthService();
