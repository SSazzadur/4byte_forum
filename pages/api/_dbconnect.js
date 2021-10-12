const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "4byte_forum",
});

db.connect(err => {
    if (err) {
        console.log(err);
    }

    console.log("Connected to database");
});

module.exports = db;
