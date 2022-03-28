/********* importer des fichier , modules *************/
const connection = require('../db__connection');  //importer l'info de mysql 

const fs = require('fs');
/********* FIN: importer des fichier , modules *************/


/***************** Creer un post  ***************/                       ///DB, here :utilisateur change to user later!!!!!!!
//////////////////post un post  ?? S'il n'y a pas de "file"
exports.createPost = /*async(req, res, next) => {
    console.log('post one article---------');
    console.log(req.body);
    // only JSON file works. not the form-data on postman
    let sql = `INSERT INTO post (postname, comment, user_id) VALUES 
      ('${ req.body.postname }', '${ req.body.comment }', '${req.headers.user_id}' )`; //headers = sessionid?    
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
  console.log(req.headers.user_id);         

  let sqlWithoutImage = `INSERT INTO post (postname, comment, user_id ) VALUES 
    ('${ req.body.postname }', '${ req.body.comment }', '${req.headers.user_id}')`;   ///need to put user_id into headers  
  await connection.query( sqlWithoutImage, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('L\'article post(comment, postname) est inseré : ' + req.body.comment);
    res.status(201).json({ message: 'Votre post(sans image) est bien crée!'});
  });
  if (req.body.image) {
    let sqlWithImage = `INSERT INTO post (postname, comment, image, user_id ) VALUES (
    '${ req.body.postname }', '${ req.body.comment }', 
    ('LOAD_FILE('${req.protocol}://${req.get('host')}/images/${req.file.filename}')'
    '${req.headers.user_id}')`;                                                      
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
exports.liker = async(req, res, next) => {
  console.log('Liker un post---------');
  console.log('post id : ' + req.params.id);
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
exports.updatePost = async(req, res, next) => {  ///not considered -> change images   can be changed by other Id :check the userID, utilisateur_id wont be renewed
  console.log('update specific post---------');         
  console.log('post id : ' + req.params.id);

  console.log('just wanna change postname');
  let sqlPostname = `UPDATE post SET postname = '${ req.body.postname }' WHERE id = ${ req.params.id } `;
  await connection.query( sqlPostname, (err, result) => {
    console.log(result);
    if (err) {
      throw err;
    }
    console.log('Le postname est modifié');
  });

  console.log('just wanna change COMMENT');
  let sqlComment = `UPDATE post SET comment = '${ req.body.comment }' WHERE id = ${ req.params.id } `;
  await connection.query(sqlComment, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Le comment est modifié');
  });
  res.status(201).json({ message: 'Le comment/ postname est modifié.' }); ///shows before sqls send
};
/************* FIN: Modifier un post **************/


/************* Supprimer un post ******************/
exports.deletePost = async(req, res, next) => {  ////working BUT image file not deleted n need to check the userID
  console.log('delete specific post---------');
  console.log('post id : ' + req.params.id);

  let sqlDelete = `DELETE FROM post WHERE id = ${ req.params.id }`;
  console.log('just wanna delete a post');
  await connection.query( sqlDelete, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: 'Le post est bien supprimé' }); 
    console.log('Le post est bien supprimé');
  });
};
/************* FIN: Supprimer un post ******************/