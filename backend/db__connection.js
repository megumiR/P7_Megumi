const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",         //user name is root for database(admin)
  password: "password",
  database: "test"
});
/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM utilisateur", function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });