const { validationResult } = require("express-validator");
const ValidationRequest = (req, res, next) => {
    console.log(req.body);
    const resultvalidator = validationResult(req);
    console.log(resultvalidator.array());
    if (!resultvalidator.isEmpty()) {
        return res.status(400).json({
            success: false,
            messgae: "Validasi input gagal!",
            errors: resultvalidator
                .array()
                .map((e) => ({ msg: e.msg, param: e.param })),
        });
    }
    next();
};
module.exports = ValidationRequest;
