const express = require("express");
const router = express.Router();
const Authroute = require("./src/modules/auth/auth.route");
const AnggotaRoute = require("./src/modules/anggota/anggota.route")
const InformationRoute = require("./src/modules/informasi/information.route")
const KegiatanRoute = require("./src/modules/kagiatan/kegiatan.route")
const AbsensiRoute = require("./src/modules/absensi/absensi.route")
router.use("/auth", Authroute);
router.use("/anggota", AnggotaRoute)
router.use("/informasi", InformationRoute)
router.use("/kegiatan", KegiatanRoute)
router.use("/absensi", AbsensiRoute)
module.exports = router;

