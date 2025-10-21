const express = require("express");
const { createUserValidator, loginValidator } = require("./auth.validation");
const ValidationRequest = require("../../middleware/validatorMiddleware");
const AuthController = require("./auth.controller");
const asyncErrorHandler = require("../../errors/asynErrorHandler");
const jwtAuth = require("../../middleware/jwtMiddleware")
const roleValidate = require("../../middleware/roleAdminandMember")
const route = express.Router();
route.post(
    "/register",
    createUserValidator,
    roleValidate,
    ValidationRequest,
    asyncErrorHandler(AuthController.RegisterUser.bind(AuthController))
);
route.post(
    "/login",
    loginValidator,
    ValidationRequest,
    asyncErrorHandler(AuthController.LoginUser.bind(AuthController))
);
route.get(
    "/profile",
    jwtAuth,
    asyncErrorHandler(AuthController.ProfileUser.bind(AuthController))
);
module.exports = route;
