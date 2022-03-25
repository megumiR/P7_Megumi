/********* importer des fichier , modules *************/
const connection = require('../db__connection');  //importer l'info de mysql 

const fs = require('fs');
/********* FIN: importer des fichier , modules *************/


/***************** Creer un post  ***************/
//////////////////post un post  ?? S'il n'y a pas de "file"
exports.createPost = /*async(req, res, next) => {
    console.log('post one article---------');
    console.log(req.body);
    // only JSON file works. not the form-data on postman
    let sql = `INSERT INTO post (postname, comment, utilisateur_id) VALUES 
      ('${ req.body.postname }', '${ req.body.comment }', '${req.headers.utilisateur_id}' )`; //sessionid?
    await connection.query( sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('L\'article post est inseré : '+ req.body.comment);
  
      res.status(201).json({ message: 'Votre post est bien crée!'});
    });
};*/
/////////// s'il y a un fichier {oui traiter l'image}:{non traiter que l'objet}
async(req, res, next) => {
  console.log('post one article---------');   // this works with the form-data n JSON on postman
  const post = req.file ?              
  {
      ...JSON.parse(req.body.post),
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`   
  } : { ...req.body };
  console.log('post: ');
  console.log(post);            
  console.log(req.body.image);
  console.log(req.headers.utilisateur_id);

  let sqlWithoutImage = `INSERT INTO post (postname, comment, utilisateur_id ) VALUES 
    ('${ req.body.postname }', '${ req.body.comment }', '${req.headers.utilisateur_id}')`;   ///need to put utilisateur_id into headers
  await connection.query( sqlWithoutImage, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('L\'article post(comment, postname) est inseré : ' + req.body.comment);
    res.status(201).json({ message: 'Votre post(sans image) est bien crée!'});
  });
  if (req.body.image) {
    let sqlWithImage = `INSERT INTO post (postname, comment, image, utilisateur_id ) VALUES (
    '${ req.body.postname }', '${ req.body.comment }', 
    ('LOAD_FILE('${req.protocol}://${req.get('host')}/images/${req.file.filename}')'
    '${req.headers.utilisateur_id}')`; 
    connection.query( sqlWithImage, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('L\'article post(avec image) est inseré : ' + req.body.image);
    res.status(201).json({ message: 'Votre post(avec image) est bien crée!'});
    });
  }       
};
/***************** FIN: Creer un post  ***************/


/******************* Afficher tous les posts *********************/
exports.showallposts = async(req, res, next) => {     ///It works with images too?
    console.log('home with posts---------');
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
/******************* FIN: Afficher tous les posts *********************/


/************ Liker/ Disliker un post ******************/
//  IL FAUT TESTER depuis la
exports.liker = async(req, res, next) => {
  console.log('Liker un post---------');
  let sqlFind = `SELECT * FROM post WHERE id = ${ req.params.id }`;
  await connection.query( sqlFind, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('specifié post por liker');
  });
};
/************ FIN: Liker/ Disliker un post ******************/


/************* Modifier un post **************/
exports.updatePost = async(req, res, next) => {
    console.log('update specific post---------');  
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
/************* FIN: Modifier un post **************/


/************* Supprimer un post ******************/
exports.deletePost = async(req, res, next) => {
  console.log('delete specific post---------');
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
/************* FIN: Supprimer un post ******************/


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