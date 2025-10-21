const BadRequest = require("../../errors/BadRequest")
const NotFound = require("../../errors/NotFound")
const Kegiatan = require("./kegiatan.model")
const { Op, where } = require("sequelize")
class KegiatanService {
    async getAllKegiatan() {
        try {
            const getDataKegiatan = await Kegiatan.findAll({
                include: [
                    {
                        model: Auth,
                        as: "user",
                        require: true,
                        attribute: ["name", "password", "email", "role"],
                    },
                ],
            })
            if (getDataKegiatan.length === 0)
                throw new BadRequest("Data kegiatan tidak ada")
            if (!getDataKegiatan)
                throw new BadRequest("Data tidak valid untuk kegiatan!")
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async getKegiatanById(id) {
        try {
            const dataById = await Kegiatan.findOne({
                include: [
                    {
                        model: Auth,
                        as: "user",
                        require: true,
                        attribute: ["name", "password", "email", "role"],
                    },
                ],
            })
            if (!dataById)
                throw new BadRequest("Data dengan menggunakan id tidak dapat ditemukan")
            if (dataById.length === 0)
                throw new BadRequest("Data yang dicari berdasarkan id tidak ada!")
            await Kegiatan.findByPk(id)
            return dataById
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async createKegiatan(data) {
        try {
            const kegiatan = await Kegiatan.findAll({
                where: {
                    user_id: data.user_id
                }
            })
            if (!kegiatan) {
                throw new BadRequest("Gagal menemukan user untuk kegiatan")
            }
            const createDataKegiatan = await Kegiatan.create(data)
            if (!createDataKegiatan) {
                throw new BadRequest("Gagal membuat data kegiatan")
            }
            return createDataKegiatan
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async UpdateKegiatan(data, id) {
        try {
            const kegiatan = await Kegiatan.findAll({
                where: {
                    user_id: data.user_id
                }
            })
            if (!kegiatan) {
                throw new BadRequest("Gagal menemukan user untuk kegiatan")
            }
            const updateDataKegiatan = await Kegiatan.update(data, {
                where: { id }
            })
            if (!updateDataKegiatan) {
                throw new BadRequest("Gagal membuat data kegiatan")
            }
            return updateDataKegiatan
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async deleteDataAnggota(id) {
        try {
            const findId = await Kegiatan.findByPk(id)
            await findId.destroy()
            return findId
        } catch (error) {
            throw new BadRequest(error)
        }
    }
    async KegiatanMingguan(userId) {
        try {
            const date = new Date()
            const startWeek = new Date(date.getDate(), date.getDay(), + 1)
            startWeek.setHours(0, 0, 0, 0)
            const endWeek = new Date(date.getDate(), date.getDay(), + 6)
            endWeek.setHours(23, 59, 59, 999)
            const FindIdUser = await Kegiatan.findAll({
                where: {
                    user_id: userId
                },
                tanggal: {
                    [Op.between]: [startWeek, endWeek]
                }
            })
            let JumlahKegiatanMingguan = 0;
            const HitungKegiatanMingguan = await FindIdUser.count()
            JumlahKegiatanMingguan = HitungKegiatanMingguan
            if (!FindIdUser) {
                throw new BadRequest("Gagal menemukan data user!")
            }
            return {
                data: FindIdUser,
                jumlah: JumlahKegiatanMingguan
            }
        } catch (error) {
            throw new BadRequest(error)
        }
    }

    async KegiatanBulanan(userId) {
        try {
            const date = new Date()
            const startMonth = new Date(date.getFullYear(), date.getMonth(), 1, 0)
            const endOfMonth = new Date(date.getFullYear(), date.getMonth(), +1, 0)
            const findKegiatanUser = await Kegiatan.findAll({
                where: {
                    user_id: userId
                },
                tanggal: {
                    [Op.between]: [startMonth, endOfMonth]
                }
            })
            let JumlahKegiatanBulanan = 0;
            const HitungJumlahKegiatanBulanan = await findKegiatanUser.count()
            JumlahKegiatanBulanan = HitungJumlahKegiatanBulanan
            if (!findKegiatanUser) {
                throw new BadRequest("Gagal menemukan userId")
            }
            return {
                data: findKegiatanUser,
                jumlah: JumlahKegiatanBulanan
            }
        } catch (error) {
            throw new BadRequest(error)
        }
    }
}
module.exports = new KegiatanService()