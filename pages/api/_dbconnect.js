const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "4byte_forum",
});

db.connect();

module.exports = db;
