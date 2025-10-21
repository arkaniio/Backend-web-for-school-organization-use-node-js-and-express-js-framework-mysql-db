const BadRequest = require("../errors/BadRequest")
function KegiatanMiddleware(req, res, next) {
    if (req.body.jenisKegiatan !== "Belajar" || "Hiburan" || "Destinasi" || "Acara")
        throw new BadRequest("Jenis kegiatan yang dipilih tidak termasuk kategori!")
    const ValidData = req.body.kegiatan
    if (ValidData.startsWith("anjing" || "babi" || "jelek"))
        throw new BadRequest("Kata kata yang dipilih mohon yang bagus bagus!")
    next()
}
module.exports = KegiatanMiddleware