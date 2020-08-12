const mysql = require("mysql")
var connsql = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "123456",
    database: "picture",
})

connsql.connect(function(err) {
    if (err) throw err
})

module.exports = connsql