/* from .env file
const dotenv = require('dotenv');
const result = dotenv.config();
console.log(result.parsed);
 */

/************ importer framework , modules **********/
const express = require('express');
const path = require('path'); 
/************ FIN : importer framework , modules ************/


//Appeler la method express(qui permet de creer application express)
const app = express();
//acceder aux requetes json.body
app.use(express.json());

app.use(
  express.urlencoded({
      extended: true,
  })
);
/******* Controle d'acces pour les API  ***************************/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
/********************* FIN: controle d'acces routes generales*****************/
  
//image ,path, express static
/************** Gerer la date du dossier images en maniere statique pour framework express*****************/
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));
/************** FIN: Gerer la date du dossier images en maniere statique *********************************/ 



/********* ajouter des routes **********************/
const utilisateurRoutes = require('./routes/utilisateur');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like');

//ajouter auth apres
app.use('/api', utilisateurRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/like', likeRoutes);
/********* FIN: ajouter des routes****************/




/*********** Exporter l'application (const app) pour etre accedé par autres fichiers et server************/
module.exports = app; 
/*********** FIN: Exporter l'application (const app) ***************/