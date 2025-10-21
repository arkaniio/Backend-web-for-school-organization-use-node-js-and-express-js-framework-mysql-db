const AnggotaService = require("./anggota.service")
const BadRequest = require("../../errors/BadRequest")
const { StatusCodes, NETWORK_AUTHENTICATION_REQUIRED } = require("http-status-codes")
const NotFoundError = require("../../errors/NotFound")
class AnggotaController {
    async getAllAnggota(page, limit, search, req, res) {
        try {
            const PagingData = parseInt(page)
            const LimitData = parseInt(limit)
            const Search = String(search)
            const getAllAnggotaData = await AnggotaService.getALlAnggotaByUserId(PagingData, LimitData, Search)
            if (!getAllAnggotaData)
                throw new NotFoundError("Gagal melihat semua data anggota!")
            return res.status(StatusCodes.OK).json({
                data: getAllAnggotaData,
                success: true,
                message: "Berhasil melihat semua data anggota"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getAnggotaById(req, res, next) {
        try {
            const params = req.params.id
            const getDataById = await AnggotaService.getAnggotaById(params)
            if (!getDataById)
                throw new NotFoundError("Gagal melihat ")
            return res.status(StatusCodes.OK).json({
                data: getDataById,
                success: true,
                message: "Berhasil melihat data anggota dengan id!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async createDataAnggota(req, res, next) {
        try {
            const params = {
                ...req.body,
                user_id: req.userId
            }
            const createDataAnggota = await AnggotaService.createDataAnggota(params)
            if (!createDataAnggota)
                throw new NotFoundError("Gagal menemukan data anggota!")
            console.log(createDataAnggota)
            return res.status(StatusCodes.OK).json({
                data: createDataAnggota,
                success: true,
                message: "Berhasil membuat data anggota !"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async UpdateDataAnggota(req, res, next) {
        try {
            const paramsUpdate = {
                ...req.body,
                user_id: req.userId
            }
            const paramsId = req.params.id
            const updateData = await AnggotaService.UpdateDataAnggota(paramsId, paramsUpdate)
            if (!updateData)
                throw new NotFoundError("Gagal menemukan data yang mau diupdate!")
            return res.status(StatusCodes.OK).json({
                data: updateData,
                success: true,
                message: "Berhasil update data anggota!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async DeleteDataAnggota(req, res, next) {
        try {
            const params = req.params.id
            const deleteDataAnggota = await AnggotaService.deleteDataAnggota(params)
            if (!deleteDataAnggota)
                throw new NotFoundError("Gagal menemukan id anggota!")
            return res.status(StatusCodes.OK).json({
                data: deleteDataAnggota,
                success: true,
                message: "Berhasil menghapus data anggota!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getJumlahAnggota(req, res, next) {
        try {
            const params = req.userId
            const getAllDataSiswa = await AnggotaService.getJumlahSemuaAnggota(params)
            if (!getAllDataSiswa)
                throw new NotFoundError("Gagal menemukan dan menghitung jumlah data siswa")
            return res.status(StatusCodes.OK).json({
                data: getAllDataSiswa,
                success: true,
                message: "Berhasil menghitung total jumlah semua data siswa!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
}
module.exports = new AnggotaController()