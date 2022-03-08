/********* importer des fichier , modules *************/
const bcrypt = require('bcrypt');
const connection = require('../db__connection');  //importer l'info de mysql 

const fs = require('fs');
//const jwt = require('jsonwebtoken');

/********* la logique *********/
//post un post  ?????????????????????? S'il n'y a pas de "file"
exports.createPost = async(req, res, next) => {
    console.log('post one article');
    console.log(req.body);
    let utilisateurId = req.body.utilisateur_id;  //the same with :parseInt(req.body.utilisateur_id)
    // only JSON file works. not the form-data
    let sql = `INSERT INTO post (postname, comment, utilisateur_id) VALUES 
      ('${ req.body.postname }', '${ req.body.comment }', ${utilisateurId} )`; //sessionid?
    await connection.query( sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('L\'article post est inseré : ');
      console.log(result);
  
      res.status(201).json({ message: 'Votre post est bien crée!'});
      // Redirect to home page
          res.redirect('/posts');
      res.end();
    });
};
/*async(req, res, next) => {
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

exports.showallposts = async(req, res, next) => {
    console.log('home with posts');
    let sql = `SELECT * FROM post`;
    await connection.query( sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('posts: ', result);
      if (result.length >0) {
              res.status(200).json({ result });
      } else {
        res.status(400).json({ message: 'Il n\'y a pas de post à affichier !' });
      }
    });
};
//  IL FAUT TESTER depuis la
exports.liker = async(req, res, next) => {
  console.log('Liker un post');
  let sqlFind = `SELECT * FROM post WHERE id = ${ req.params.id }`;
  await connection.query( sqlFind, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('specifié post por liker');

  });

};
//modifier 
exports.updatePost = async(req, res, next) => {
    console.log('update specific post');  
    let sqlFind = `SELECT * FROM post WHERE id = ${ req.params.id }`;
    await connection.query( sqlFind, (err, result) => {
      if (err) {
        throw err;
      }
      let sqlPostname = `UPDATE post SET postname = ${ req.body.postname } WHERE id = ${ req.params.id } `;
      let sqlComment = `UPDATE post SET comment = ${ req.body.comment } WHERE id = ${ req.params.id } `;
      connection.query( sqlPostname, (err, result) => {
        if (err) {
          throw err;
        }
        console.log('Le postname est changé');
        connection.query(sqlComment, (err, result) => {
          if (err) {
            throw err;
          }
          console.log('Le comment est changé');
        });
      });
      res.status(201).json({ message: 'modifié' });
    });
};
//supprimer
exports.deletePost = async(req, res, next) => {
  console.log('delete specific post');
  let sqlFind = `SELECT * FROM post WHERE id = ${ req.params.id }`;
  await connection.query( sqlFind, (err, result) => {
    if (err) {
      throw err;
    }
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      let sql = `DELETE FROM post WHERE id = ${ req.params.id } `;
      connection.query( sql, (err, result) => {
        if (err) {
          throw err;
        }
        console.log('Le post est bien supprimé');
        res.status(200).json({ message: 'supprimé' });
      });
    });
  });
  
};
/** session id?????????????????????//
const cookieParser = require('cookie-parser');
const session = require('express-session')
app.use(cookieParser());
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));
//req.sessionID and req.session.id for taking back the id
app.post('/login', function(req, res)
{
  var sid = req.sessionID;
  var username = req.body.user;
  var password = req.body.pass;

  users.findOne({username : username, password : password}, function(err, result)
  { 
    ...
    sessionStore.destroy(result.session, function(){
       ...
       users.update({_id: result._id}, {$set:{"session" : sid}});
       ...
    }
    ...
  }
}*/