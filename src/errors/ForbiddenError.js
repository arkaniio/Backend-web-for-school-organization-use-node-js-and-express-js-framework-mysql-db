const HttpError = require("./Httperror")
class ForbiddenError extends HttpError {
    constructor(message = "Forbidden Error") {
        super(message, 501)
    }
}
module.exports = ForbiddenError