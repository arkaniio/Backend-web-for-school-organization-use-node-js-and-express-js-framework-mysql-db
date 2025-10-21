const { body, param } = require("express-validator")
const createValidator = [
    body("judul")
        .notEmpty().withMessage("Harus mengisi informasi yang ingin ditambahkan")
        .isString().withMessage("informasi harus berupa teks"),
    body("deskripsi")
        .notEmpty().withMessage("Harus mengisi deskripsi yang berhubungan dengan judul!")
        .isString().withMessage("Deskripsi harus berupa teks"),
    body("pembuat")
        .notEmpty().withMessage("Harus mengisi nama pembuat dari yang membuat informasi ini!")
        .isString().withMessage("Pembuat yang menulis judul dan dekripsi harus berupa teks"),
    body("kategori")
        .notEmpty().withMessage("Kategori dalam informasi harus teriisi!")
        .isString().withMessage("Kategori harus berupa teks!"),
    body('tanggal')
        .optional()
        .isISO8601().toDate().withMessage('Format tanggal tidak valid'),
    body("statusInformasi")
        .notEmpty().withMessage("Harus mengisi status informasi")
        .isString().withMessage("Status informasi harus berupa teks"),
]
const updateValidator = [
    body("informasi")
        .notEmpty().withMessage("Harus mengisi informasi yang ingin ditambahkan")
        .isString().withMessage("informasi harus berupa teks"),
    body('tanggal')
        .optional()
        .isISO8601().toDate().withMessage('Format tanggal tidak valid'),
    body("statusInformasi")
        .notEmpty().withMessage("Harus mengisi status informasi")
        .isString().withMessage("Status informasi harus berupa teks"),
]
const idParamVaidator = [
    param('id')
        .isInt().withMessage('ID anggota harus berupa angka'),
]
module.exports = {
    createValidator,
    updateValidator,
    idParamVaidator
}