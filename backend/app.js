/************ importer framework , modules **********/
//pour mongodb et mongoose
const mongoose = require('mongoose');
const express = require('express');

/************ FIN : importer framework , modules ************/


/*  Enleve apres --MongoDB Atlas         **/
mongoose.connect('mongodb+srv://megumi:JZw7qlKVtgp24sVW@clusterprojet6piiquante.ybmmt.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//pw: JZw7qlKVtgp24sVW
/*************************/


//Appeler la method express(qui permet de creer application express)
const app = express();
//acceder aux requetes json.body
app.use(express.json());


