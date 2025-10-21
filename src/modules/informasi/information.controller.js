const InformationService = require("./information.service")
const BadRequest = require("../../errors/BadRequest")
const { StatusCodes } = require("http-status-codes")
const { trace } = require("../anggota/anggota.route")
class InformationController {
    async getAllInformation(req, res, next) {
        try {
            const getSemuaData = await InformationService.getAllInformation()
            if (!getSemuaData)
                throw new BadRequest("Gagal menemukan semua data informasi")
            return res.status(StatusCodes.OK).json({
                data: getSemuaData,
                success: true,
                message: "Berhasil mengambil semua data informasi!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getInformationById(req, res, next) {
        try {
            const params = req.params.id
            const getById = await InformationService.getInformationById(params)
            if (!getById)
                throw new BadRequest("Gagal menemukan informasi berdasarkan id!")
            return res.status(StatusCodes.OK).json({
                data: getById,
                success: true,
                message: "Berhasil mengambil data informasi berdasarkan id!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async createNewInformation(req, res, next) {
        try {
            const params = {
                ...req.body,
                user_id: req.userId
            }
            const createData = await InformationService.createNewInformation(params)
            if (!createData)
                throw new BadRequest("Gagal membuat data informasi baru")
            return res.status(StatusCodes.OK).json({
                data: createData,
                success: true,
                message: "Berhasil membuat data informasi baru!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async updateNewInformation(req, res, next) {
        try {
            const paramsUpdate = {
                ...req.body,
                user_id: req.userId
            }
            const idParams = req.params.id
            const updateInformation = await InformationService.UpdateNewInformation(paramsUpdate, idParams)
            if (!updateInformation)
                throw new BadRequest("Gagal mengupdate data informasi")
            return res.status(StatusCodes.OK).json({
                data: updateInformation,
                success: true,
                message: "Berhasil update data informasi!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async deleteNewInformation(req, res, next) {
        try {
            const params = req.params.id
            const deleteDataInformation = await InformationService.DeleteDataInformation(params)
            if (!deleteDataInformation)
                throw new BadRequest("Gagal menghapus data informasi")
            return res.status(StatusCodes.OK).json({
                data: deleteDataInformation,
                success: true,
                message: "Berhasil menghapus data informasi"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
}
module.exports = new InformationController()