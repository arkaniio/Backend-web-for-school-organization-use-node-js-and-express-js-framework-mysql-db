const HttpError = require("./Httperror")
class NotFound extends HttpError {
    constructor(message = "Not Found Error") {
        super(message, 404)
    }
}
module.exports = NotFound