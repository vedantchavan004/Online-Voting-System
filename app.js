var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "voterDetails"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE candidatelist(candidate VARCHAR(255) primary key,politicalparty VARCHAR(80),votingcount INT(11) NOT NULL DEFAULT '0')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    
    console.log("Table created");
  });
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE users(id int(11) primary key AUTO_INCREMENT,voterID VARCHAR(255) unique key NOT NULL,username VARCHAR(255) unique key NOT NULL, password VARCHAR(255) NOT NULL, contact VARCHAR(10) NOT NULL)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
    
//     console.log("Table created");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE admin(adminname VARCHAR(255) primary key, password VARCHAR(255) NOT NULL)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
    
//     console.log("Table created");
//   });
// });
