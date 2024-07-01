const mysql = require('mysql');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "permission",
    password: "Tuffy@123",
    socketPath: "/var/run/mysqld/mysqld.sock"
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});
module.exports = db;
