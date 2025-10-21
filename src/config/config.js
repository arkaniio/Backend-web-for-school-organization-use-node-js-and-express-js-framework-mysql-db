const dotenv = require("dotenv")
dotenv.config({
    path: process.env.DOTENV_PATH || ".env",
});
const dialect = "mysql"
module.exports = {
    db: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        dialect: dialect,
        port: parseInt(process.env.DB_PORT),
        host: process.env.DB_HOST
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    Url: {
        baseUrl: process.env.SERVER_BASE_URL || "https://localhost:3000"
    }
}