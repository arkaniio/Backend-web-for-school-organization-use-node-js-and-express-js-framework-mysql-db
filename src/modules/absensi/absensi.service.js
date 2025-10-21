const { Op, where } = require("sequelize")
const BadRequest = require("../../errors/BadRequest")
const NoteFoundError = require("../../errors/NotFound")
const Absensi = require("./absensi.model")
class AbsensiService {
    async getAllAbsensi() {
        try {
            const findAbsensi = await Absensi.findAll({
                include: [
                    {
                        model: Auth,
                        as: "user",
                        require: true,
                        attribute: ["name", "password", "email", "role"],
                    },
                ],
            })
            if (findAbsensi.length === 0) {
                throw new BadRequest("Tidak ada anggota yang melakukan absensi!")
            }
            return findAbsensi
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getOneAbsensi(id) {
        try {
            const getAbsensiOne = await Absensi.findByPk(id)
            if (getAbsensiOne.length === 0 && !getAbsensiOne) {
                throw new BadRequest("Gagal menemukan data absensi / tidak ada!")
            }
            return getAbsensiOne
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async createAbsensi(data) {
        try {
            const date = new Date()
            const startMonth = new Date(date.getMonth(), date.getFullYear(), 1)
            const endMonth = new Date(date.getMonth(), date.getFullYear(), + 1)
            const find = await Absensi.findAll({
                where: {
                    user_id: data.user_id,
                    tanggal: {
                        [Op.between]: [startMonth, endMonth]
                    }
                },
            })
            for (const absensi of find) {
                if (absensi.status !== "hadir" && absensi.status !== "tidak hadir") {
                    throw new BadRequest("Status yang dipilih tidak ada!")
                }
            }
            const createNewAbsensi = await Absensi.create(data)
            if (!createNewAbsensi) {
                throw new BadRequest("Gagal membuat data absensi!")
            }
            if (find.length === 0) {
                throw new BadRequest("Gagal menemukan absensi!")
            }
            return createNewAbsensi

        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async updateAbsensi(data, id) {
        try {
            const date = new Date()
            const startMonth = new Date(date.getMonth(), date.getFullYear(), 1)
            const endMonth = new Date(date.getMonth(), date.getFullYear(), + 1)
            const find = await Absensi.findAll({
                where: {
                    user_id: data.user_id,
                    tanggal: {
                        [Op.between]: [startMonth, endMonth]
                    }
                },
            })
            for (const absensi of find) {
                if (absensi.status !== "hadir" && absensi.status !== "tidak hadir") {
                    throw new BadRequest("Status yang dipilih tidak ada!")
                }
            }
            const updateAbsensi = await Absensi.update(data, {
                where: { id }
            })
            if (!updateAbsensi) {
                throw new BadRequest("Gagal membuat data absensi!")
            }
            if (find.length === 0) {
                throw new BadRequest("Gagal menemukan absensi!")
            }
            return updateAbsensi

        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async jumlahTidakHadir(userId) {
        try {
            const date = new Date()
            const startMonth = new Date(date.getMonth(), date.getFullYear(), 1)
            const endMonth = new Date(date.getMonth(), date.getFullYear(), + 1)
            const findUserId = await Absensi.findAll({
                where: {
                    user_id: userId
                },
                tanggal: {
                    [Op.between]: [startMonth, endMonth]
                }
            })
            if (findUserId.length === 0 && !findUserId) {
                throw new BadRequest("Gagal menemukan user dan mencari user gagal!")
            }
            let jumlahNot = 0
            const countJumlahTidakHadir = await Absensi.count({
                where: {
                    status: "tidak hadir"
                }
            })
            jumlahNot = countJumlahTidakHadir
            return {
                jumlahTidakHadir: jumlahNot
            }
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async jumlahHadir(userId) {
        try {
            const date = new Date()
            const startMonth = new Date(date.getMonth(), date.getFullYear(), 1)
            const endMonth = new Date(date.getMonth(), date.getFullYear(), + 1)
            const findUserId = await Absensi.findAll({
                where: {
                    user_id: userId
                },
                tanggal: {
                    [Op.between]: [startMonth, endMonth]
                }
            })
            if (findUserId.length === 0 && !findUserId) {
                throw new BadRequest("Gagal menemukan user dan mencari user gagal!")
            }
            let jumlahYes = 0
            const countJumlahHadir = await Absensi.count({
                where: {
                    status: "hadir"
                }
            })
            jumlahYes = countJumlahHadir
            return {
                jumlahHadir: jumlahYes
            }
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async findTidakHadir(userId) {
        try {
            const date = new Date()
            const startMonth = new Date(date.getMonth(), date.getFullYear(), 1)
            const endMonth = new Date(date.getMonth(), date.getFullYear(), + 1)
            const getTidakHadir = await Absensi.findAll({
                where: {
                    user_id: userId
                },
                tanggal: {
                    [Op.between]: [startMonth, endMonth]
                },
                status: "tidak hadir"
            })
            if (getTidakHadir.length === 0 && !getTidakHadir) {
                throw new BadRequest("Tidak menemukan data absensi!")
            }
            return getTidakHadir
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async findHadir(userId) {
        try {
            const date = new Date()
            const startMonth = new Date(date.getMonth(), date.getFullYear(), 1)
            const endMonth = new Date(date.getMonth(), date.getFullYear(), + 1)
            const getHadir = await Absensi.findAll({
                where: {
                    user_id: userId
                },
                tanggal: {
                    [Op.between]: [startMonth, endMonth]
                },
                status: "hadir"
            })
            if (getHadir.length === 0 && !getHadir) {
                throw new BadRequest("Tidak menemukan data absensi!")
            }
            return getHadir
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async deletDataAbsensi(id) {
        try {
            const findPk = await Absensi.findByPk(id)
            await findPk.destroy()
            return findPk
        } catch (error) {
            throw new BadRequest(error)
        }
    }
}
module.exports = new AbsensiService()