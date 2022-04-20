/********* importer des fichier , modules *************/
const connection = require("../db__connection"); //importer l'info de mysql
const fetch = require("node-fetch");
const fs = require("fs");
/********* FIN: importer des fichier , modules *************/

/***************** Creer un post  ***************/ ///DB, here :utilisateur change to user later!!!!!!!
//////////////////post un post  ?? S'il n'y a pas de "file"
exports.createPost =
  /*async(req, res, next) => {
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
  async (req, res, next) => {
    console.log("post one article---------"); // this works with the form-data n JSON on postman
    console.log(req.headers.user_id);

    if (!req.file) {
      let sqlWithoutImage = `INSERT INTO post (postname, comment, user_id ) VALUES 
      ('${req.body.postname}', '${req.body.comment}', '${req.headers.user_id}')`; ///need to put user_id into headers
      await connection.query(sqlWithoutImage, (err, result) => {
        if (err) {
          return res.status(400).json({ message: "erreur : Insertion post erreur" });
        }
        console.log("L'article post(comment, postname) est inseré : " + req.body.comment);
        res.status(201).json({ message: "Votre post(sans image) est bien crée!" });
      });
    } else {
      var imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      console.log(imageUrl);
      fetch(imageUrl)
        .then((resultFetch) => resultFetch.blob())
        .then((imageBlob) => {
          let sqlWithImage = `INSERT INTO post (postname, comment, image, user_id ) VALUES (
            '${req.body.postname}',
            '${req.body.comment}', 
            '${imageBlob}',
            '${req.headers.user_id}')`;

          connection.query(sqlWithImage, (err, result) => {
            if (err) {
              return res.status(400).json({
                message: "erreur : Insertion post (avec image) erreur",
              });
            }
            console.log("L'article post(avec image) est inseré : " + imageUrl);
            res.status(201).json({ message: "Votre post(avec image) est bien crée!" });
          });
        });
    }
  };
/***************** FIN: Creer un post  ***************/

/******************* Afficher tous les posts *********************/
exports.showallposts = async (req, res, next) => {
  console.log("home with posts---------");
  let allPosts = `SELECT * FROM post`;
  await connection.query(allPosts, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne peut pas chercher dans le tableau post",
      });
    }
    console.log("posts: ", result);
    var allPostsWithImg = [];
    if (result.length > 0) {
      result.forEach( post => {
        if ( post.image != null) {
          console.log(post.image);      ///////////////////need to change sth for showing images?
        } else {
          allPostsWithImg.push(post);
        }
      });
     // result = allPostsWithImg;
      res.status(200).json({ result });
    } else {
      res.status(400).json({ message: "Il n'y a pas de post à affichier !" });
    }
  });
};
/******************* FIN: Afficher tous les posts *********************/

/************ Liker/ Disliker un post ******************/
exports.liker = async (req, res, next) => {
  console.log("Liker un post---------");
  console.log("post id : " + req.params.id);
  console.log("Who is trying to react?: id " + req.headers.user_id);

  let sqlFind = `SELECT * FROM post WHERE id = '${req.params.id}'`;
  await connection.query(sqlFind, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne trouve pas le post que vous avez choisi",
      });
    }
    console.log(result);
    // si l'user a deja Liké ce post et enregistré sur DB
    let sqlFind = `SELECT * FROM post_likes WHERE post_id = '${req.params.id}' AND user_id = '${req.headers.user_id}'`;
    connection.query(sqlFind, (err, res) => {
      if (err) {
        return res.status(400).json({ message: "erreur : savoir si c'est déjà Liker" });
      }
      console.log("step1:Already reacted to this post?");
      console.log(res);

      if (!res.length) {
        // .length pour savoir si un array est vide ou pas
        console.log("step2:No, react for the 1st time");
        ///////////////////////// foreign key --- check how to insert data into foreign keys
        let sqlLike = `INSERT INTO post_likes (post_id, user_id, likes) VALUES ('${result[0].id}', '${req.headers.user_id}', '${req.body.likes}')`;
        connection.query(sqlLike, (err, result) => {
          if (err) {
            return res.status(400).json({ message: "erreur : Liker pour la 1ere fois" });
          }
          console.log("Liker/ Disliker post pour la 1ere fois");
        });
      } else if (res.length > 0) {
        console.log("step2:Yes, already reacted to the post");
        // update the existed result
        let sqlLikeUpdated = `UPDATE post_likes SET likes = '${req.body.likes}' WHERE post_id = '${result[0].id}' AND user_id = '${req.headers.user_id}'`;
        connection.query(sqlLikeUpdated, (err, result) => {
          if (err) {
            return res.status(400).json({ message: "erreur : modifier le Liker" });
          }
          console.log("Liker/ Disliker modifié");
        });
      }
    });
  });
  res.status(200).json({ message: "Le comment Like/Dislike est enregistré." }); ///shows before sqls send
};
/************ FIN: Liker/ Disliker un post ******************/

/************* Modifier un post **************/
exports.updatePost = async (req, res, next) => {
  ///not considered -> change images   can be changed by other Id :check the userID, utilisateur_id wont be renewed
  console.log("update specific post---------");
  console.log("post id : " + req.params.id);

  console.log("just wanna change postname");
  let sqlPostname = `UPDATE post SET postname = '${req.body.postname}' WHERE id = ${req.params.id} `;
  await connection.query(sqlPostname, (err, result) => {
    console.log(result);
    if (err) {
      return res.status(400).json({ message: "erreur : on ne peut pas modifier le post name" });
    }
    console.log("Le postname est modifié");
  });

  console.log("just wanna change COMMENT");
  let sqlComment = `UPDATE post SET comment = '${req.body.comment}' WHERE id = ${req.params.id} `;
  await connection.query(sqlComment, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "erreur : on ne peut pas modifier le comment" });
    }
    console.log("Le comment est modifié");
  });
  res.status(201).json({ message: "Le comment/ postname est modifié." }); ///shows before sqls send
};
/************* FIN: Modifier un post **************/

/************* Supprimer un post ******************/
exports.deletePost = async (req, res, next) => {
  ////working BUT image file not deleted n need to check the userID
  console.log("delete specific post---------");
  console.log("post id : " + req.params.id);

  let sqlDelete = `DELETE FROM post WHERE id = ${req.params.id}`;
  console.log("just wanna delete a post");
  await connection.query(sqlDelete, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "erreur : on ne peut pas supprimer" });
    }
    res.status(200).json({ message: "Le post est bien supprimé" });
    console.log("Le post est bien supprimé");
  });
};
/************* FIN: Supprimer un post ******************/
