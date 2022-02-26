/************ importer framework , modules **********/
const express = require('express');

/************ FIN : importer framework , modules ************/


/************  ******************/


//Appeler la method express(qui permet de creer application express)
const app = express();
//acceder aux requetes json.body
app.use(express.json());

console.log(app);
