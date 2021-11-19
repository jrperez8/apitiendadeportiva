const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'dbempresa',
    multipleStatements:true
});

mysqlConnection.connect(function(err){
    if (err){
        console.error(err);
    }
    else{
        console.log('Database is connected');
    }
});
module.exports = mysqlConnection;