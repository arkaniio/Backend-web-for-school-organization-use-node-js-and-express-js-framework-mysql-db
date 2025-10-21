const { Information } = require("../../../models/index");
const BadRequest = require("../../errors/BadRequest");
const NoteFoundError = require("../../errors/NotFound");
const { Op } = require("sequelize");
class InformationService {
    async getAllInformation() {
        try {
            const getDataInformation = await Information.findAll({
                include: [
                    {
                        model: Auth,
                        as: "user",
                        require: true,
                        attribute: ["name", "password", "email", "role"],
                    },
                ],
            });
            if (!getDataInformation) {
                throw new BadRequest("Gagal melihat semua data informasi");
            }
            if (getDataInformation.length === 0) {
                throw new BadRequest("Tidak dapat memuat data informasi!")
            }
            return getDataInformation;
        } catch (error) {
            throw new BadRequest(error);
        }
    }
    async getInformationById(id) {
        try {
            const findInformation = await Information.findOne({
                include: {
                    model: Auth,
                    as: "user",
                    require: true,
                    attribute: ["name", "password", "email", "role"],
                },
            });
            if (!findInformation) {
                throw new NoteFoundError("Gagal menemukan user!");
            }
            if (getOne.length === 0) {
                throw new BadRequest("Data yang ingin dilihat tidak ada!")
            }
            const getOne = await Information.findByPk(id);
            return getOne;
        } catch (error) {
            throw new BadRequest(error);
        }
    }
    async createNewInformation(data) {
        try {
            const date = new Date();
            const StartMonth = new Date(date.getMonth(), date.getFullYear(), 1);
            const EndOfMonth = new Date(date.getMonth(), date.getFullYear(), + 1);
            const findtheUser = await Information.findAll({
                where: {
                    user_id: data.user_id,
                    tanggal: {
                        [Op.between]: [StartMonth, EndOfMonth],
                    },
                },
            });
            if (!findtheUser) {
                throw new NoteFoundError("Gagal menemukan information id!");
            }
            for (const informasi of findtheUser) {
                const status = String(informasi.statusInformasi);
                if (status !== "aktif" && status !== "tidak aktif") {
                    throw new BadRequest("Pilihan tidak dapat memenuhi standar");
                }
                const kategori = String(informasi.kategori)
                if (kategori !== "lomba" && kategori !== "pengumuman") {
                    throw new BadRequest("Pilihan dalam kategori tidak masuk dalam standar!")
                }
            }
            const createDataInformation = await Information.create(data);
            return {
                createDataInformation,
            };
        } catch (error) {
            throw new BadRequest(error);
        }
    }
    async UpdateNewInformation(data, id) {
        try {
            const date = new Date();
            const StartMonth = new Date(date.getMonth(), date.getFullYear(), 1, 0);
            const EndOfMonth = new Date(date.getMonth(), date.getFullYear(), +1, 0);
            const findAlldata = await Information.findAll({
                where: {
                    user_id: data.user_id,
                    tanggal: {
                        [Op.between]: [StartMonth, EndOfMonth],
                    },
                },
            });
            if (!findAlldata) {
                throw new BadRequest("Gagal menemukan user");
            }
            for (const informasi of findAlldata) {
                const status = String(informasi.statusInformasi);
                if (status !== "aktif" && status !== "tidak aktif") {
                    throw new BadRequest("Pilihan tidak dapat memenuhi standar");
                }
                const kategori = String(informasi.kategori)
                if (kategori !== "lomba" && kategori !== "pengumuman") {
                    throw new BadRequest("Pilihan dalam kategori tidak masuk dalam standar!")
                }
            }
            const updateData = await Information.create(data, {
                where: { id },
            });
            return updateData;
        } catch (error) {
            throw new BadRequest(error);
        }
    }
    async DeleteDataInformation(id) {
        try {
            const getById = await Information.findByPk(id);
            await getById.destroy();
        } catch (error) {
            throw new BadRequest(error);
        }
    }
}
module.exports = new InformationService();
