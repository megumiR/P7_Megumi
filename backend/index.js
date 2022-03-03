
//const connection = require('./db__connection');  //importer l'info de mysql 
const express = require('express'); //
const path = require('path');
/************ Importer le fichier et mettre le port pour que app.js peut trouner ***********************/
//const port = 3000;
//La fonction normalizePort pour retouner le port validé(pas de port String)
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');

//app.set('port', port); on n'a pas besoin
/************ FIN: Importer le fichier et mettre le port ***********************/

//const utilisateur = require('./routes/utilisateur');
const app = express(); // const app = require('./app');
app.use(express.json());
/*
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
*/
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

app.use(express.static(path.join(__dirname, 'static')));


/*
app.get('/', (req, res) => {
    //res.json({ message: 'ok' });
    connection.query(
        'SELECT * FROM utilisateur',
        (error, results) => {
          console.log(results);
       //   res.render('../frontend/src/views/AccueilView.vue');
    }); 
});
*/
const utilisateurRouter = require('./routes/utilisateur');

app.use('/utilisateur/', utilisateurRouter);

app.listen(port);