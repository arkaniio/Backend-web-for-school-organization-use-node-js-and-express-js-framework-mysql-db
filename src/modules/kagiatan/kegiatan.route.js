const express = require("express")
const route = express.Router()
const { createData, updateData, idParamVaidator } = require("./kegiatan.validation")
const kegiatanMiddleware = require("../../middleware/kegiatanMiddleware")
const ImageMiddleware = require("../../middleware/imageMiddleware")
const KegiatanService = require("./kegiatan.service")
const KegiatanController = require("./kegiatan.controller")
const ValidationRequest = require("../../middleware/validatorMiddleware")
const asyncErrorHandler = require("../../errors/asynErrorHandler")
const kegiatanService = require("./kegiatan.service")
const jwtMiddleware = require("../../middleware/jwtMiddleware")
route.use(jwtMiddleware)
route.get("/",
    asyncErrorHandler(KegiatanController.getAllKegiatan.bind(KegiatanController)))
route.get("/:id",
    idParamVaidator,
    ValidationRequest,
    asyncErrorHandler(KegiatanController.getKegiatanById.bind(KegiatanController))
)
route.post("/",
    createData,
    ValidationRequest,
    ImageMiddleware,
    kegiatanMiddleware,
    asyncErrorHandler(KegiatanController.createDataKegiatan.bind(KegiatanController))
)
route.put("/:id",
    updateData,
    idParamVaidator,
    ValidationRequest,
    ImageMiddleware,
    kegiatanMiddleware,
    asyncErrorHandler(KegiatanController.updateDataKegiatan.bind(KegiatanController))
)
route.delete("/:id",
    idParamVaidator,
    ValidationRequest,
    asyncErrorHandler(KegiatanController.deleteKegiatan.bind(KegiatanController))
)
route.get("/mingguan",
    asyncErrorHandler(KegiatanController.getJumlahMingguan.bind(KegiatanController))
)
route.get("/bulanan",
    asyncErrorHandler(KegiatanController.getJumlahBulanan.bind(KegiatanController))
)
module.exports = route