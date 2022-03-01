/************ importer framework , modules **********/
const mysql = require('mysql');
const express = require('express');





/************ FIN : importer framework , modules ************/


/*  Enleve apres --MongoDB Atlas         
mongoose.connect('mongodb+srv://megumi:JZw7qlKVtgp24sVW@clusterprojet6piiquante.ybmmt.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//pw: JZw7qlKVtgp24sVW
************************/


//Appeler la method express(qui permet de creer application express)
const app = express();
//acceder aux requetes json.body
app.use(express.json());

/******* Controle d'acces pour les API  ***************************/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
/********************* FIN: controle d'acces routes generales*****************/
  
//image ,path, express static



/********* ajouter des routes **********************/
const utilisateurRoutes = require('./routes/utilisateur');



//ajouter auth apres
app.use('/api', utilisateurRoutes);



/*********** Exporter l'application (const app) pour etre accedé par autres fichiers et server************/
module.exports = app; 
/*********** FIN: Exporter l'application (const app) ***************/