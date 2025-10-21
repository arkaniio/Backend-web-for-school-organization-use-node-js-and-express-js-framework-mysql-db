const express = require("express");
const enableCors = require("cors");
const route = require("./src/modules/auth/auth.route.js");
const router = require("./route.js");
const multer = require("multer")
const config = require("./src/config/config.js");
const ErrorMidlewareHandler = require("./src/middleware/errorHandle.js")
const ValidationRequest = require("./src/middleware/validatorMiddleware.js");
const {
    enableCORS,
    setSecurityHeaders,
} = require("./src/middleware/setSecurity.js");
require("./src/store/sequelize.js");
const app = express();
const PORT = 5001;
app.use(express.json())
app.use(ErrorMidlewareHandler)
app.use(express.urlencoded({ extended: true }))
app.use(enableCORS);
app.use(setSecurityHeaders);
app.use("/organisasi/data", router);
app.get("/", async (req, res) => {
    res.status(200).json({
        data: "Berhasil!",
    });
});
app.get("/", async (err, req, res) => {
    const errorStatus = err.statusCode || 500;
    res.status(errorStatus).json({
        data: "Terjadi kesalahan pada server!",
    });
});
app.listen(PORT, () => {
    console.log(
        "Berhasil menjalankan server dengan port ",
        PORT,
        "dan berada di ",
        config.Url.baseUrl
    );
});
