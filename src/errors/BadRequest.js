const HttpError = require("./Httperror")
class BadRequest extends HttpError {
    constructor(message = "Bad request error") {
        super(message, 400)
    }
}
module.exports = BadRequest