

const connection = require('./db__connection');  //importer l'info de mysql 
const express = require('express'); 
const path = require('path');
const bcrypt = require('bcrypt');
const multer = require('./middleware/multer-config');
const fs = require('fs');
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

//signin
app.post('/api/signin', async( req, res, next) => {
  console.log('signin post request');
  //const hashedPassword = await bcrypt.hash(req.body.password,10);
  //let sql = `INSERT INTO utilisateur (name, email, password) VALUES ('${ req.body.name }', '${ req.body.email }', hashedPassword)`;
  let sql = `INSERT INTO utilisateur (name, email, password) VALUES 
    ('${ req.body.name }', '${ req.body.email }', '${ req.body.password }')`;
  await connection.query( sql, (err, result) => {
  /* if email already exists in database
    if (req.body.email ?????) {
      console.log('L'email deja utilisé : ');
      console.log(req.body.email);
    } */
    if (err) {
      throw err;
    }
    console.log('L\'info signin est inseré avec le nom: ');
    console.log(req.body.name);
  });
});

//login
app.post('/api/login', async(req, res, next) => {
  console.log('login post request');
  let username = req.body.username;
  let sql = `SELECT name, email, password FROM utilisateur WHERE email = '${ req.body.email}' `;
  await connection.query( sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('L\'info utilisateur: ', result);
    if (result.length >0) {
      console.log('login ok');
			// Redirect to home page
			res.redirect('/posts');
    } else {
      res.json({ message : 'le nom et/ou l\'email et/ou le mot de passe incorrecte' });
    }
  });
});
//post  ???????????????????????????????????????????? S'il n'y a pas de "file"
app.post('/api/posts', multer, async(req, res, next) => {
  console.log('post one article');
  let sql = `INSERT INTO post (postname, comment, utilisateur_id) VALUES 
    ('${ req.body.postname }', '${ req.body.comment }', '${ req.body.utilisateur_id }')`; //sessionid?
  await connection.query( sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('L\'article post est inseré : ');
    console.log(result);

    res.json({ message: 'Votre post est bien crée!'});
    // Redirect to home page
		res.redirect('/posts');
    res.end();
  });
  
});
  /*
app.post('/api/posts', multer, async(req, res, next) => {
  console.log('post one article');
  const postartObject = req.file ?              // s'il y a un fichier {oui traiter l'image}:{non traiter l'objet}
  {
      ...JSON.parse(req.body.postart),
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
  } : { ...req.body };

  let sql = `INSERT INTO post (postname, comment, image) VALUES 
    ('${ req.body.postname }', '${ req.body.comment }', '${req.protocol}://${req.get('host')}/images/${req.file.filename}')`; //${ req.body.image }
  await connection.query( sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('L\'article post est inseré : ');
    console.log(result);

    res.json({ message: 'Votre post est bien crée!'});
    // Redirect to home page
		res.redirect('/posts');
  });
});                */


//la page d'accueil avec touts les posts
app.get('/api/posts', async(req, res, next) => {
  console.log('home with posts');
  let sql = `SELECT * FROM post`;
  await connection.query( sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('posts: ', result);
    if (result.length >0) {
			res.json({ result });
    } else {
      res.json({ message: 'Il n\'y a pas de post à affichier !' });
    }
  });
});

//Liker 
/*app.post('/api/posts', async(req, res, next) => {
  console.log('Liker un post');
});*/

//modifier  post? put?
app.put('/api/posts/:id', async(req, res) => {
  console.log('update specific post');
  const postId = req.params.id;
  let postname = req.body.postname;
  let comment = req.body.comment;
  /*if (req.params.id ===  ) {

  }*/
  let sql = `UPDATE post SET postname = ${ req.body.postname } WHERE id = ${ req.params.id } `;
  res.json({ message: 'modifié' });
});
//supprimer

app.get('/', (req, res) => {
  //  res.json({ message: 'ok' });  //http://localhost:3000 -->{ message: 'ok' } OK
  connection.query(
    'SELECT * FROM utilisateur',
    (error, results) => {
    console.log(results);
    res.json({ results: results});  //http://localhost:3000 --> results of utilisateur table
    //res.render('../index.html');
  }); 
});
/*
//const utilisateurRouter = require('./routes/utilisateur');
//app.use('/utilisateur/', utilisateurRouter);
const postRouter = require('./routes/posts');       //pass db__connection n posts/routes -->connected! result:[]
app.use('/posts', postRouter);

ルーターがGETとかのリクエストに対してのみ動かない（ローカルホストがcannot get/)
*/




/**************** ecouter le port normalizé **************/
/*
app.listen(port, () =>{
  console.log('port is listening 3000');
}
);   -->OK*/
app.listen(port);