const multer = require("multer")
function ImageMiddleware(req, res, next) {
    const multerImage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images")
        },
        filename: (req, file, cb) => {
            cb(null, new Date().getTime() + "-", file.originalname)
        }
    })
    const filterImage = (req, file, cb) => {
        if (file.mimtype === "png" ||
            file.mimtype === "jpg" ||
            file.mimtype === "jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
    next()
    return multer({ storage: multerImage, fileFilter: filterImage })
}
module.exports = ImageMiddleware