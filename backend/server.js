/************ Imporeter http pour un programe qui ecoute /repond les requete ***********/
const http = require('http');   
/************ FIN: Imporeter http *********************/


/************ Importer le fichier et mettre le port pour que app.js peut trouner ***********************/
const app = require('./app');

const server = http.createServer(app);

server.listen(3000);
