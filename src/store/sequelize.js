const Sequelize = require("sequelize");
const config = require("../config/config");
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
})
const testdata = async () => {
    try {
        await sequelize.authenticate()
        console.log("Berhasil terhubung dengan database!")
    } catch (error) {
        console.log("Gagal sambung ke database")
        console.log(error)
    }
}
testdata()

module.exports = sequelize