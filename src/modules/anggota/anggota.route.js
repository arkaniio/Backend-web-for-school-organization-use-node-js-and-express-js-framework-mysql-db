const express = require("express")
const route = express.Router()
const AnggotaController = require("./anggota.controller")
const jwtAuth = require("../../middleware/jwtMiddleware")
const asyncErrorHandler = require("../../errors/asynErrorHandler")
const ValidationRequest = require("../../middleware/validatorMiddleware")
const {
    createValidation,
    idParamvalidation,
    updateParamValidation
} = require('./anggota.validation')
route.use(jwtAuth)
route.get("/",
    asyncErrorHandler(AnggotaController.getAllAnggota.bind(AnggotaController))
)
route.get("/jumlah",
    asyncErrorHandler(AnggotaController.getJumlahAnggota.bind(AnggotaController))
)
route.get("/:id",
    idParamvalidation,
    ValidationRequest,
    asyncErrorHandler(AnggotaController.getAnggotaById.bind(AnggotaController))
)
route.post("/daftar",
    createValidation,
    ValidationRequest,
    asyncErrorHandler(AnggotaController.createDataAnggota.bind(AnggotaController))
)
route.put("/:id",
    updateParamValidation,
    idParamvalidation,
    ValidationRequest,
    asyncErrorHandler(AnggotaController.UpdateDataAnggota.bind(AnggotaController))
)
route.delete("/:id",
    idParamvalidation,
    ValidationRequest,
    asyncErrorHandler(AnggotaController.DeleteDataAnggota.bind(AnggotaController))
)
module.exports = route