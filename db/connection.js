const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'new_user',
    // Your MySQL password
    password: 'new_password$100A',
    database: 'company'
});

module.exports = db;