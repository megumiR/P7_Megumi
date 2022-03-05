/************ importer framework , modules **********/
//const mysql = require('mysql');
const express = require('express');
const path = require('path'); 
/************ FIN : importer framework , modules ************/

/******* connection pour la base de donnee ***********/



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
//app.use('/images', express.static(path.join(__dirname, 'images')));
/************** FIN: Gerer la date du dossier images en maniere statique *********************************/ 
app.use(express.static(path.join(__dirname, 'static')));


/********* ajouter des routes **********************/
const utilisateurRoutes = require('./routes/utilisateur');



//ajouter auth apres
app.use('/api', utilisateurRoutes);


/********* FIN: ajouter des routes****************/




/*********** Exporter l'application (const app) pour etre accedé par autres fichiers et server************/
module.exports = app; 
/*********** FIN: Exporter l'application (const app) ***************/