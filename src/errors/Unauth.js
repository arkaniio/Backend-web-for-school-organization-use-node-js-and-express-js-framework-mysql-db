const HttpError = require("./Httperror")
class Unauthorization extends HttpError {
    constructor(message = "Unauthorization Error") {
        super(message, 401)
    }
}
module.exports = Unauthorization