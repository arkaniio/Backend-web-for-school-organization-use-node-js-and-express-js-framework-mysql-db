const express = require("express")
const {
    updateValidator,
    createValidator,
    idParamVaidator
} = require("./information.validate")
const BadRequest = require("../../errors/BadRequest")
const ValidationRequest = require("../../middleware/validatorMiddleware")
const InformationController = require("./information.controller")
const asyncErrorHandler = require("../../errors/asynErrorHandler")
const route = express.Router()
const jwtMiddleware = require("../../middleware/jwtMiddleware")
route.use(jwtMiddleware)
route.get("/",
    ValidationRequest,
    asyncErrorHandler(InformationController.getAllInformation.bind(InformationController))
)
route.get("/:id",
    idParamVaidator,
    ValidationRequest,
    asyncErrorHandler(InformationController.getInformationById.bind(InformationController))
)
route.post("/create",
    createValidator,
    ValidationRequest,
    asyncErrorHandler(InformationController.createNewInformation.bind(InformationController))
)
route.put("/:id",
    updateValidator,
    idParamVaidator,
    ValidationRequest,
    asyncErrorHandler(InformationController.updateNewInformation.bind(InformationController))
)
route.delete("/:id",
    idParamVaidator,
    ValidationRequest,
    asyncErrorHandler(InformationController.deleteNewInformation.bind(InformationController))
)
module.exports = route