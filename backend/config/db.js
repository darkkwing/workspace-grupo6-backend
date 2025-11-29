const mysql = require ("mysql2/promise");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"1234",//poner contraseña que eligieras al instalar la base de datos
    database:"groupesix"
})

module.exports = db;