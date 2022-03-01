const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "m",
  password: "p7F1rsT0855/*"
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
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });