/************ Environment variables ******************/
require("dotenv").config();

/************ Importer le fichier et mettre le port pour que app.js peut trouner ***********************/
const app = require("./app");

//La fonction normalizePort pour retouner le port validé(pas de port String)
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");

//app.set('port', port); //on n'a pas besoin?
/************ FIN: Importer le fichier et mettre le port ***********************/

/**************** ecouter le port normalizé **************/
app.listen(port);
/**************** FIN: ecouter le port normalizé **************/
