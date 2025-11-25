const mysql = require ("mysql2/promise");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"groupeSix"
})

module.exports = db;