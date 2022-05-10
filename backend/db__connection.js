/************* importer le mysql ************/
const mysql = require('mysql');
/************* FIN: importer le my sql********/


/****** l'info de connection mysql *********/
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",         //user name is root for database(admin)
  password: "password",     
  database: "groupomania"
});
/****** FIN: l'info de connection mysql *********/


/********* affichier une erreur en cas d'erreur connection et con.query pour affichier l'info db************/
connection.connect((err) => {
    if (err) {
      console.log('error connecting: ');
      throw err;
    }
    console.log("Connected!");
  });

module.exports = connection; 