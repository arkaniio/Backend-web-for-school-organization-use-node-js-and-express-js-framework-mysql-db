const { STATUS_CODES } = require("http")
const BadRequest = require("../../errors/BadRequest")
const KegiatanService = require("./kegiatan.service")
const { StatusCodes } = require("http-status-codes")
const { triggerAsyncId } = require("async_hooks")
class KegiatanController {
    async getAllKegiatan(req, res, next) {
        try {
            const ambilSemua = await KegiatanService.getAllKegiatan()
            if (!ambilSemua) {
                throw new BadRequest("Gagal melihat semua data kegiatan")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: ambilSemua,
                message: "Berhasil mengambil semua data anggota"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getKegiatanById(req, res, next) {
        try {
            const params = req.params.id
            if (!params) {
                throw new BadRequest("id tidak valid")
            }
            const getKegiatanMenggunakanId = await KegiatanService.getKegiatanById(params)
            if (!getKegiatanMenggunakanId) {
                throw new BadRequest("Gagal melihat data kegiatan menggunakan id!")
            }
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async createDataKegiatan(req, res, next) {
        try {
            const requestBody = {
                ...req.body,
                user_id: userId
            }
            if (!requestBody) {
                throw new BadRequest("Gagal menemukan data user")
            }
            const Kegiatan = await KegiatanService.createKegiatan(requestBody)
            return res.status(StatusCodes.OK).json({
                success: true,
                data: Kegiatan,
                message: "Berhasil membuat kegiatan baru!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async updateDataKegiatan(req, res, next) {
        try {
            const requestBody = {
                ...req.body,
                user_id: userId
            }
            const params = req.params.id
            if (!requestBody) {
                throw new BadRequest("Gagal menemukan data user")
            }
            const updateKegiatan = await KegiatanService.UpdateKegiatan(requestBody, params)
            if (!updateKegiatan) {
                throw new BadRequest("Gagal mengupdate kegiatan!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: updateKegiatan,
                message: "Gagal mengupdate data kegiatan"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getJumlahMingguan(req, res, next) {
        try {
            const paramsId = req.userId
            if (!paramsId) {
                throw new BadRequest("Gagal menemukan data user!")
            }
            const jumlahData = await KegiatanService.KegiatanMingguan(paramsId)
            if (!jumlahData) {
                throw new BadRequest("Gagal mengambil data kegiatan dalam mingguan!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: jumlahData,
                message: "Berhasil mengambil data kegiatan dalam mingguan"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getJumlahBulanan(req, res, next) {
        try {
            const paramsId = req.userId
            if (!paramsId) {
                throw new BadRequest("Gagal menemukan data user!")
            }
            const getJumlah = await KegiatanService.KegiatanBulanan(paramsId)
            if (!getJumlah) {
                throw new BadRequest("Gagal mengambil data kegiatan bulanan!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: getJumlah,
                message: "Berhasil mengambil data dalam bulanan!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async deleteKegiatan(req, res, nex) {
        try {
            const params = req.params.id
            if (!params) {
                throw new BadRequest("Harus menggunakan id!")
            }
            const deleteData = await KegiatanService.deleteDataAnggota(params)
            if (!deleteData) {
                throw new BadRequest("Gagal menghapus data kegiatan!")
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: deleteData,
                message: "Berhasil menghapus data kegiatan!"
            })
        } catch (error) {
            throw new BadRequest(error)
        }
    }
}
module.exports = new KegiatanController()