/********* importer des fichier , modules *************/
const bcrypt = require('bcrypt');
const connection = require('../db__connection');  //importer l'info de mysql 


//const jwt = require('jsonwebtoken');

/********* la logique *********/
//post un post  ?????????????????????? S'il n'y a pas de "file"
exports.post = async(req, res, next) => {
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
  
      res.json({ message: 'Votre post est bien crée!'});
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
              res.json({ result });
      } else {
        res.json({ message: 'Il n\'y a pas de post à affichier !' });
      }
    });
};

exports.liker = async(req, res, next) => {
    console.log('Liker un post');
};
//modifier  post? put?
exports.updatePost = async(req, res) => {
    console.log('update specific post');
    const postId = req.params.id;
    let postname = req.body.postname;
    let comment = req.body.comment;
    //if (req.params.id ===  ) {}
  
  
    let sql = `UPDATE post SET postname = ${ req.body.postname } WHERE id = ${ req.params.id } `;
    res.json({ message: 'modifié' });
};
//supprimer
exports.deletePost = async(req, res, next) => {
    console.log('delete specific post');
};

