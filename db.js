const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Forever1993@",
    database: "notes_app"
})

module.exports = pool.promise();