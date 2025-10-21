const HttpError = require("../errors/Httperror")
const ErrorMidlewareHandler = (req, res, error, next) => {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        })
    }
    if (process.env.NODE_DEVELOPMENT !== "development") {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            })
        }
    }
    next()
}
module.exports = ErrorMidlewareHandler