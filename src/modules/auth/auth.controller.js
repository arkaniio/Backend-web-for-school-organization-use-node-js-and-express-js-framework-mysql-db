const BadRequest = require("../../errors/BadRequest");
const AuthService = require("./auth.service");
const { STATUS_CODES } = require("http");
const { StatusCodes } = require("http-status-codes");
class AuthController {
    async RegisterUser(req, res) {
        try {
            const getRegister = await AuthService.Register(req.body);
            if (!getRegister) {
                console.log("failed to register for a new user!");
                throw new BadRequest("Gagal melakukan register!");
            }
            return res.status(StatusCodes.OK).json({
                data: getRegister,
                message: "Create register successfully",
                status: true,
            });
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                console.log({ message: error.message, type: "failed" });
            }
            return res.status(StatusCodes.BAD_REQUEST).json({
                data: "None",
                message: "Gagal login user!",
                success: false,
            });
        }
    }
    async LoginUser(req, res) {
        try {
            const getLogin = await AuthService.Login(req.body);
            if (!getLogin) {
                console.log("Failed to login for go to the next page");
                throw new BadRequest("Gagal login!");
            }
            return res.status(StatusCodes.OK).json({
                data: getLogin,
                message: "Login for a user has been successfully",
                status: true,
            });
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                console.log({ message: error.message, type: "failed" });
            }
            return res.status(StatusCodes.BAD_REQUEST).json({
                data: "None",
                message: "Gagal login user!",
                success: false,
            });
        }
    }
    async ProfileUser(req, res) {
        try {
            const getProfile = await AuthService.GetProfile(req.userId);
            if (!getProfile) {
                console.log("Failed to load the user profile!");
                throw new BadRequest("Gagal melihat profile user!");
            }
            return res.status(StatusCodes.OK).json({
                data: getProfile,
                message: "Load the user profile has been successfully",
                success: true,
            });
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                console.log({ message: error.message, type: "failed" });
            }
            return res.status(StatusCodes.BAD_REQUEST).json({
                data: "None",
                message: "Gagal login user!",
                success: false,
            });
        }
    }
}
module.exports = new AuthController();
