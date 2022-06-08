/************* importer le mysql ************/
const mysql = require("mysql");
/************* FIN: importer le my sql********/

/****** l'info de connection mysql *********/
const connection = mysql.createConnection({
  host: `${process.env.HOST_NAME}`,  //`${process.env.JWT_KEY}`   "localhost"
  user: `${process.env.USER_NAME}`, //user name is root for database(admin)
  password: `${process.env.PASS_WORD}`,
  database: `${process.env.DATA_BASE}`,
});
/****** FIN: l'info de connection mysql *********/

/********* affichier une erreur en cas d'erreur connection et con.query pour affichier l'info db************/
connection.connect((err) => {
  if (err) {
    console.log("error connecting: ");
    throw err;
  }
  console.log("Connected!");
});

module.exports = connection;
