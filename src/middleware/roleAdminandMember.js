function roleValidate(req, res, next) {
    try {
        const adminValidatePassword = process.env.PASSWORD_ADMIN
        if (req.body.role !== "member" && req.body.role !== "admin") {
            return res.status(400).json({
                data: "role yang dipilih tidak valid!"
            })
        }
        if (req.body.role === "admin") {
            req.body.adminCode = adminValidatePassword
            if (req.body.adminCode !== adminValidatePassword) {
                return res.status(400).json({
                    data: "Password salah untuk masuk dengan role admin!"
                })
            }
            req.body.role = "admin"
        }
        next()
    } catch (error) {
        console.log(error)
        console.error(error)
    }
}
module.exports = roleValidate