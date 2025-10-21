const { body, param } = require("express-validator")
const createValidation = [
    body("name")
        .isLength({ max: 30 }).withMessage("Nama harus maksimal memiliki 30 huruf!")
        .notEmpty().withMessage("Nama Wajib diisi sebagai anggota!")
        .isLength({ min: 3 }).withMessage("Nama minimal memiliki 3 huruf")
        .isString().withMessage("nama harus berupa teks"),
    body("kelas")
        .notEmpty().withMessage("Kelas Wajib diisi sebagai data anggota")
        .isLength({ min: 1 }).withMessage("Kelas minimal memiliki 1 karakter")
        .isString().withMessage("kelas harus berupa teks bukan angka!"),
    body("umur")
        .notEmpty().withMessage("Umur anggota wajib diisi!"),
    body("alasan")
        .notEmpty().withMessage("Alasan masuk sebagai anggota harus diisi!")
        .isString().withMessage("alasan harus berupa teks"),
    body('tanggal')
        .optional()
        .isISO8601().toDate().withMessage('Format tanggal tidak valid'),
    body("statusPendaftaran")
        .optional()
        .isString().withMessage("status pendaftaran anggota harus berupa teks"),
    body("status")
        .optional()
        .isString().withMessage("status anggota ekstakulikuler harus berupa teks")
]
const idParamvalidation = [
    param('id')
        .isInt().withMessage('ID anggota harus berupa angka'),
]
const updateParamValidation = [
    body("name")
        .isLength({ max: 30 }).withMessage("Nama harus maksimal memiliki 30 huruf!")
        .notEmpty().withMessage("Nama Wajib diisi sebagai anggota!")
        .isLength({ min: 3 }).withMessage("Nama minimal memiliki 3 huruf")
        .isString().withMessage("nama harus berupa teks"),
    body("kelas")
        .notEmpty().withMessage("Kelas Wajib diisi sebagai data anggota")
        .isLength({ min: 1 }).withMessage("Kelas minimal memiliki 1 karakter")
        .isString().withMessage("kelas harus berupa teks bukan angka!"),
    body("umur")
        .notEmpty().withMessage("Umur anggota wajib diisi!"),
    body("alasan")
        .notEmpty().withMessage("Alasan masuk sebagai anggota harus diisi!")
        .isString().withMessage("alasan harus berupa teks"),
    body('tanggal')
        .optional()
        .isISO8601().toDate().withMessage('Format tanggal tidak valid'),
    body("statusPendaftaran")
        .optional()
        .isString().withMessage("status pendaftaran anggota harus berupa teks"),
    body("status")
        .optional()
        .isString().withMessage("status anggota ekstrakulikuler harus berupa teks")
]
module.exports = {
    idParamvalidation,
    createValidation,
    updateParamValidation
}