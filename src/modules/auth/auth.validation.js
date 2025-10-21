const { body } = require("express-validator");
const createUserValidator = [
    body("name")
        .notEmpty()
        .withMessage("The name must be required!")
        .isString()
        .withMessage("The name should be string, not number !")
        .isLength({ max: 50 })
        .withMessage("The max character of the name is 50 char!"),
    body("password")
        .notEmpty()
        .withMessage("Password must be required!")
        .isLength({ min: 8 })
        .withMessage("The password should have at least 8 character!"),
    body("email")
        .notEmpty()
        .withMessage("Email should be required!")
        .isEmail()
        .withMessage("Email has not valid!"),
];
const loginValidator = [
    body("email").notEmpty().withMessage("Email must be required"),
    body("password").notEmpty().withMessage("Password must be required"),
];
module.exports = {
    createUserValidator,
    loginValidator,
};
