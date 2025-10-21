const { body, param } = require("express-validator")
const { idParamvalidation } = require("../anggota/anggota.validation")
const createAbsensiValidator = [
    body("status")
        .notEmpty().withMessage("Harus mengisi status sebagai anggota")
        .isString().withMessage("Status harus berupa teks!"),
    body("namaAnggota")
        .notEmpty().withMessage("Harus mengisi nama anggota yang mau absen!")
        .isString().withMessage("Nama anggota harus berupa teks!"),
    body("kelas")
        .notEmpty().withMessage("Kelas yang akan absen harus diisi!")
        .isString().withMessage("Kelas harus berupa teks!"),
    body("kelasDiMac")
        .notEmpty().withMessage("Kelas anggota di mac harus diisi!")
        .isString().withMessage("Kelas anggota yang di mac harus berupa teks alphabet!")
]
const updateAbsensiValidator = [
    body("status")
        .notEmpty().withMessage("Harus mengisi status sebagai anggota")
        .isString().withMessage("Status harus berupa teks!"),
    body("namaAnggota")
        .notEmpty().withMessage("Harus mengisi nama anggota yang mau absen!")
        .isString().withMessage("Nama anggota harus berupa teks!"),
    body("kelas")
        .notEmpty().withMessage("Kelas yang akan absen harus diisi!")
        .isString().withMessage("Kelas harus berupa teks!"),
    body("kelasDiMac")
        .notEmpty().withMessage("Kelas anggota di mac harus diisi!")
        .isString().withMessage("Kelas anggota yang di mac harus berupa teks alphabet!")
]
const paramValidator = [
    param('id')
        .isInt().withMessage('ID anggota harus berupa angka'),
]
module.exports = {
    createAbsensiValidator,
    updateAbsensiValidator,
    idParamvalidation
}