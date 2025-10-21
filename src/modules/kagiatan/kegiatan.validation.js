const { body, param } = require("express-validator")
const createData = [
    body("jenisKegiatan")
        .notEmpty().withMessage("Jenis kegiatan harus diiisi!")
        .isString().withMessage("Jenis kegiatan harus berupa teks!"),
    body("tanggal")
        .optional()
        .notEmpty().withMessage("Tanggal wajib diisi!")
        .isISO8601().withMessage("Format tanggal tidak valid!"),
    body("kegiatan")
        .notEmpty().withMessage("Kegiatan yang diadakan harus diisi!")
        .isString().withMessage("Kegiatan yang dilakukan harus berupa teks!"),
    body("image")
        .notEmpty().withMessage("Gambar harus diisi!")
        .isString().withMessage("Gambar harus berupa string png jpg atau jpeg!")
]
const updateData = [
    body("jenisKegiatan")
        .notEmpty().withMessage("Jenis kegiatan harus diiisi!")
        .isString().withMessage("Jenis kegiatan harus berupa teks!"),
    body("tanggal")
        .notEmpty().withMessage("Tanggal wajib diisi!")
        .isISO8601().withMessage("Format tanggal tidak valid!"),
    body("kegiatan")
        .notEmpty().withMessage("Kegiatan yang diadakan harus diisi!")
        .isString().withMessage("Kegiatan yang dilakukan harus berupa teks!"),
    body("image")
        .notEmpty().withMessage("Gambar harus diisi!")
        .isString().withMessage("Gambar harus berupa string png jpg atau jpeg!")
]
const idParamVaidator = [
    param('id')
        .isInt().withMessage('ID anggota harus berupa angka'),
]
module.exports = {
    createData,
    updateData,
    idParamVaidator
}