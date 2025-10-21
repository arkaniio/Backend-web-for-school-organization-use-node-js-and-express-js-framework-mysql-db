const AbsensiService = require("./absensi.service")
const BadRequest = require("../../errors/BadRequest")
const { StatusCodes } = require("http-status-codes")
class AbsensiController {
    async getAllAbsensi(req, res, next) {
        try {
            const findAll = await AbsensiService.getAllAbsensi()
            if (!findAll) {
                throw new BadRequest("Gagal menemukan semua data absensi")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: findAll,
                message: "Berhasil melihat semua data absensi"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getOneAbsensi(req, res, next) {
        try {
            const params = req.params.id
            if (!params) {
                throw new BadRequest("Id tidak valid!")
            }
            const getOne = await AbsensiService.getOneAbsensi(params)
            if (!getOne) {
                throw new BadRequest("Gagal melihat salah satu data absensi!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: getOne,
                message: "Berhasil melihat salah satu data absensi!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async createAbsensi(req, res, next) {
        try {
            const parameter = {
                ...req.body,
                user_id: userId
            }
            if (!parameter) {
                throw new BadRequest("Tidak ada data yang diinput")
            }
            const create = await AbsensiService.createAbsensi(parameter)
            if (!create) {
                throw new BadRequest("Gagal membuat data absensi")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: create,
                message: "Berhasil membuat data absensi!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async updateAbsensi(req, res, next) {
        try {
            const params = req.params.id
            const parameter = {
                ...req.body,
                user_id: userId
            }
            if (!parameter && !params) {
                throw new BadRequest("Parameter tidak valid!")
            }
            const update = await AbsensiService.updateAbsensi(parameter, params)
            if (!update) {
                throw new BadRequest("Gagal update data absensi")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: update,
                message: "Berhasil update data absensi!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async jumlahTidakHadir(req, res, next) {
        try {
            const parameter = req.userId
            if (!parameter) {
                throw new BadRequest("Parameter tidak valid!")
            }
            const get = await AbsensiService.jumlahTidakHadir(parameter)
            if (!get) {
                throw new BadRequest("Gagal menghitung data absensi!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: get,
                message: "Berhasil menghitung data q"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async jumlahHadir(req, res, next) {
        try {
            const parameter = req.userId
            if (!parameter) {
                throw new BadRequest("Parameter tidak valid!")
            }
            const get = await AbsensiService.jumlahHadir(parameter)
            if (!get) {
                throw new BadRequest("Gagal menghitung data absensi!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: get,
                message: "Berhasil menghitung data absensi hadir"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getTidakHadir(req, res, next) {
        try {
            const parameter = req.userId
            if (!parameter) {
                throw new BadRequest("Parameter tidak valid!")
            }
            const find = await AbsensiService.findTidakHadir(parameter)
            if (!find) {
                throw new BadRequest("Gagal melihat data absensi tidak hadir!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: find,
                message: "Berhasil melihat data absensi yang tidak hadir!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getHadir(req, res, next) {
        try {
            const parameter = req.userId
            if (!parameter) {
                throw new BadRequest("Parameter tidak valid!")
            }
            const find = await AbsensiService.findHadir(parameter)
            if (!find) {
                throw new BadRequest("Gagal melihat data absensi hadir!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: find,
                message: "Berhasil melihat data absensi hadir!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async deleteData(req, res, next) {
        try {
            const params = req.params.id
            if (!params) {
                throw new BadRequest("Parameter tidak valid1")
            }
            const deleteAbsensi = await AbsensiService.deletDataAbsensi(params)
            if (!deleteAbsensi) {
                throw new BadRequest("Gagal menghapus data absensi!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: deleteAbsensi,
                message: "Berhasil menghapus data absensi!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
}
module.exports = new AbsensiController()