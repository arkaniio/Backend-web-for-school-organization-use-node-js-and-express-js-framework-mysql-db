const { Anggota, Auth, Information } = require("../../../models/index.js")
const BadRequest = require("../../errors/BadRequest.js")
const { Op, where } = require("sequelize")
class AnggotaService {
    async getAllAnggota() {
        try {
            const getAllData = await Anggota.findAll({
                include: [{
                    model: User,
                    as: "user",
                    require: true,
                    attribute: ["name", "password", "email", "role"]
                }, {
                    model: Information,
                    as: "information",
                    require: true,
                    attribute: ["informasi", "statusInformasi", "tanggal"]
                }]
            })
            return getAllData
        } catch (error) {
            console.error(error)
            if (error instanceof Error)
                console.log(error.message)
        }
    }
    async getALlAnggotaByUserId(page = 1, limit = 10, search = "", userId) {
        const offset = (page - 1) * limit
        const whereUserId = {
            user_id: userId
        }
        if (search) {
            whereUserId[Op.or] = {
                note: [Op.like] = `%${search}%`,
                description: [Op.like] = `%${search}%`
            }
        }
        const { rows, count } = await Anggota.findAndCountAll({
            where: {
                user_id: userId
            },
            include: [{
                model: User,
                as: "user",
                require: true,
                attribute: ["name", "password", "email", "role"]
            }, {
                model: Information,
                as: "information",
                require: true,
                attribute: ["informasi", "statusInformasi", "tanggal"]
            }],
            order: [["date"]],
            offset,
            limit,
            distinct: true,
        })
        return {
            data: {
                pagination: {
                    rows: rows,
                    page: page,
                    totalPage: Math.ceil(count / limit)
                }
            }
        }
    }
    async getAnggotaById(id) {
        try {
            const findId = await Anggota.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: User,
                        as: "user",
                        require: true,
                        attribute: ["name", "password", "email", "role"]
                    }],
            })
            if (!findId) {
                throw new BadRequest("Gagal mendapatkan berdasarkan id")
            }
            return {
                findId
            }
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }
    async createDataAnggota(data) {
        try {
            const date = new Date()
            const StartMonth = new Date(date.getMonth(), date.getFullYear(), 1, 0)
            const EndOfMonth = new Date(date.getMonth(), date.getFullYear(), + 1, 0)
            const AnggotaNew = await Anggota.findAll({
                where: {
                    user_id: data.user_id,
                    tanggal: {
                        [Op.between]: [StartMonth, EndOfMonth]
                    }
                },
            })
            if (!AnggotaNew) {
                throw new BadRequest("Gagal daftar sebagai anggota eskul!")
            }
            for (const anggota of AnggotaNew) {
                if (anggota.status !== "aktif" && anggota.status !== "tidak aktif") {
                    throw new BadRequest("Pilihan tidak valid!")
                }
                if (anggota.statusPendaftaran
                    !== "ditolak" &&
                    anggota.statusPendaftaran !== "diterima") {
                    throw new BadRequest("Pilihan tidak valid!")
                }
            }
            const createNewAnggota = await Anggota.create(data)
            return {
                createNewAnggota
            }
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }
    async UpdateDataAnggota(id, data) {
        try {
            const date = new Date()
            const StartMonth = new Date(date.getMonth(), date.getFullYear(), 1, 0)
            const EndOfMonth = new Date(date.getMonth(), date.getFullYear(), + 1, 0)
            const findId = await Anggota.findAll({
                where: {
                    user_id: data.user_id,
                    tanggal: {
                        [Op.between]: [StartMonth, EndOfMonth]
                    }
                },
            })
            if (!findId) {
                throw new BadRequest("Gagal daftar sebagai anggota eskul!")
            }
            for (const anggota of findId) {
                if (anggota.status !== "aktif" && anggota.status !== "tidak aktif") {
                    throw new BadRequest("Pilihan tidak valid!")
                }
                if (anggota.statusPendaftaran
                    !== "ditolak" &&
                    anggota.statusPendaftaran !== "diterima") {
                    throw new BadRequest("Pilihan tidak valid!")
                }
            }
            const UpdateNewAnggota = await Anggota.update(data, {
                where: { id }
            })
            return {
                UpdateNewAnggota
            }
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }
    async deleteDataAnggota(id) {
        const findId = await Anggota.findByPk(id)
        const dataDelete = await findId.destroy()
        return dataDelete
    }
    async getJumlahSemuaAnggota(userId) {
        try {
            const findAllSiswa = await Anggota.findAll({
                where: {
                    user_id: userId
                }
            })
            if (findAllSiswa.length === 0) {
                throw new BadRequest("Gagal menemukan siswa!")
            }
            let jumlahDatSiswa = 0
            let jumlahStatusPendaftaran = 0
            let jumlahStatus = 0
            const countAllAnggota = await Anggota.count()
            jumlahDatSiswa = countAllAnggota
            const countAllAnggotaBystatusPendaftaran = await Anggota.count({
                where: {
                    statusPendaftaran: {
                        [Op.or]: ["ditolak", "diterima"]
                    }
                }
            })
            jumlahStatusPendaftaran = countAllAnggotaBystatusPendaftaran
            const countAnggotaByStatus = await Anggota.count({
                where: {
                    statusPendaftaran: {
                        [Op.or]: ["aktif", "tidak aktif"]
                    }
                }
            })
            jumlahStatus = countAnggotaByStatus
            return {
                jumlahSiswa: jumlahDatSiswa,
                jumlahStatusPendaftaran: jumlahStatusPendaftaran,
                jumlahStatusSiswa: jumlahStatus
            }
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }
}
module.exports = new AnggotaService()