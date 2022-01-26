const mysql = require('mysql');

// create mysql connection

const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'drogba11',
    database:'booksdb'
});

dbConn.connect(function(err){
    if(err) throw err;
    console.log('Database Connected successfully');
})

module.exports = dbConn;