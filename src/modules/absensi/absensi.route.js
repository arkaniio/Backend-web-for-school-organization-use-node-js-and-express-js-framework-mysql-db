const express = require("express")
const AbsensiController = require("./absensi.controller")
const BadRequest = require("../../errors/BadRequest")
const asyncErrorHandler = require("../../errors/asynErrorHandler")
const ValidationRequest = require("../../middleware/validatorMiddleware")
const { idParamvalidation, createAbsensiValidator, updateAbsensiValidator } = require("./absensi.validation")
const route = express.Router()
route.get("/",
    asyncErrorHandler(AbsensiController.getAllAbsensi.bind(AbsensiController))
)
route.get("/:id",
    idParamvalidation,
    ValidationRequest,
    asyncErrorHandler(AbsensiController.getOneAbsensi.bind(AbsensiController))
)
route.post("/create",
    createAbsensiValidator,
    ValidationRequest,
    asyncErrorHandler(AbsensiController.createAbsensi.bind(AbsensiController))
)
route.put("/:id",
    idParamvalidation,
    updateAbsensiValidator,
    ValidationRequest,
    asyncErrorHandler(AbsensiController.updateAbsensi.bind(AbsensiController))
)
route.delete("/:id",
    idParamvalidation,
    ValidationRequest,
    asyncErrorHandler(AbsensiController.deleteData.bind(AbsensiController))
),
    route.get("/jumlahHadir",
        asyncErrorHandler(AbsensiController.jumlahHadir.bind(AbsensiController))
    )
route.get("/jumlahTidakHadir",
    asyncErrorHandler(AbsensiController.jumlahTidakHadir.bind(AbsensiController))
)
route.get("/hadir",
    asyncErrorHandler(AbsensiController.getAllAbsensi.bind(AbsensiController))
)
route.get("/tidakHadir",
    asyncErrorHandler(AbsensiController.getTidakHadir.bind(AbsensiController))
)
module.exports = route