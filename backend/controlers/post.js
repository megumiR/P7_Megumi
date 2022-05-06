/********* importer des fichier , modules *************/
const connection = require("../db__connection"); //importer l'info de mysql
const fetch = require("node-fetch");
const fs = require("fs");
const uuid = require('uuid/v1');
/********* FIN: importer des fichier , modules *************/

/***************** Creer un post  ***************/ ///DB, here :utilisateur change to user later!!!!!!!
//////////////////post un post  ?? S'il n'y a pas de "file"
exports.createPost =
  /*async(req, res, next) => {
    console.log('post one article---------');
    console.log(req.body);
    // only JSON file works. not the form-data on postman
    let sql = `INSERT INTO post (title, content, user_id) VALUES 
      ('${ req.body.title }', '${ req.body.content }', '${req.headers.user_id}' )`; //headers = sessionid?    
    await connection.query( sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('L\'article post est inseré : '+ req.body.content);
  
      res.status(201).json({ message: 'Votre post est bien crée!'});
    });
};*/
  /////////// s'il y a un fichier {oui traiter l'image}:{non traiter que l'objet}
  async (req, res, next) => {
    console.log("post one article---------"); // this works with the form-data n JSON on postman
    console.log(req.body); //ADD .body
    console.log(req.file);
    if (!req.file) {  
      
      let sqlWithoutImage = `INSERT INTO post (title, content, user_id ) VALUES 
      ('${req.body.title}', '${req.body.content}', '${req.body.user_id}')`; ///need to put user_id into headers
      await connection.query(sqlWithoutImage, (err, result) => {
        if (err) {
          return res.status(400).json({ message: "erreur : Insertion post erreur" });
        }
        console.log("L'article post(content, title) est inseré : " + req.body.title);
        res.status(201).json({ message: "Votre post(sans image) est bien crée!" });
      });
    } else {//// everytime it thinks it is with image because of formdata???
      console.log("Il y a une image");
      console.log(req.file.filename);
      let imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      console.log(imageUrl);
      let imgFile = req.file.filename;
      console.log(imgFile);
 /*     fetch(imageUrl)
        .then((resultFetch) => resultFetch.blob())
        .then((imageBlob) => {
          let sqlWithImage = `INSERT INTO post (title, content, image, user_id ) VALUES (
            '${req.body.title}',
            '${req.body.content}', 
            '${imageBlob}',
            '${req.headers.user_id}')`;
*/
      let sqlWithImage = `INSERT INTO post (title, content, image, user_id ) VALUES 
        ('${req.body.title}', '${req.body.content}', '${req.file.filename}', '${req.body.user_id}')`; 


          connection.query(sqlWithImage, (err, result) => {
            if (err) {
              return res.status(400).json({
                message: "erreur : Insertion post (avec image) erreur",
              });
            }
            console.log("L'article post(avec image) est inseré : " + imageUrl);
            res.status(201).json({ message: "Votre post(avec image) est bien crée!" });
          });
       // });
    }
  };
/***************** FIN: Creer un post  ***************/

/******************* Afficher tous les posts *********************/
exports.showonePost = async (req, res, next) => {
  console.log("home with posts---------");
  let onePost = `SELECT * FROM post`;
  await connection.query(onePost, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne peut pas chercher de tableau post",
      });
    }
    console.log("posts: ", result);
    console.log("posts result until here------------- ");
    var onePostWithImg = [];
    if (result.length > 0) {
      result.forEach( post => {
        if ( post.image != null) { 
          post.image = `${req.protocol}://${req.get("host")}/images/${post.image}`;
          console.log('post id: '+ post.id +' --- '+post.image);
          onePostWithImg.push(post);
        } else {
          onePostWithImg.push(post);
        }
      });
     // result = onePostWithImg;
      res.status(200).json({ result });
    } else {
      res.status(400).json({ message: "Il n'y a pas de post à affichier !" });
    }
  });
};
/******************* FIN: Afficher tous les posts *********************/

/******************* Afficher le post *********************/
exports.showOnepost = async (req, res, next) => {
  console.log("one post---------");
  let onePost = `SELECT * FROM post WHERE id = ${req.params.id}`;
  await connection.query(onePost, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne peut pas chercher de tableau post",
      });
    }
    console.log("posts: ", result);
    var onePostWithImg = [];
    if ( result.image != null) { 
      result.image = `${req.protocol}://${req.get("host")}/images/${result.image}`;
      onePostWithImg.push(result);
    } else {
      onePostWithImg.push(result);
    }
     // result = onePostWithImg;
    res.status(200).json({ result });
//    } else {
 //     res.status(400).json({ message: "Il n'y a pas de post à affichier !" });
 //   }
  });
};

exports.choosePost = (req, res, next) => {
  if (!req.body.id ||
      !req.body.title ||
      !req.body.content ||
      !req.body.user_id) {
    return res.status(400).send(new Error('Bad request!'));
  }
  let query = {};
  const queryPromise = new Promise((resolve, reject) => {
    let onePost = `SELECT * FROM post WHERE id = ${req.params.id}`;
    await connection.query(onePost, (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "erreur : on ne peut pas chercher de tableau post",
        });
      }
    })
    .then((post) => {
        if (!post) {
          reject('Post not found: ' + post.id);
        }
        post.image = `${req.protocol}://${req.get("host")}/images/${post.image}`;
        resolve(post);
      }
    ).catch(
      () => {
        reject('Database error!');
      }
    )
  });
  query.push(queryPromise);

  Promise.all(query)
  .then((posts) => {///?????
      const postId = uuid();
      return res.status(201).json({
        title: req.body.title,
        posts: posts,  ///?????
        postId: postId
      })
    }
    
  ).catch(
    (error) => {
      return res.status(500).json(new Error(error));
    }
  );
};


/******************* FIN: Afficher le post *********************/

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
  res.status(200).json({ message: "Le Like/Dislike est enregistré." }); ///shows before sqls send
};
/************ FIN: Liker/ Disliker un post ******************/

/************* Modifier un post **************/
exports.updatePost = async (req, res, next) => {
  ///not considered -> change images   can be changed by other Id :check the userID, utilisateur_id wont be renewed
  console.log("update specific post---------");
  console.log("post id : " + req.params.id);

  console.log("just wanna change title");
  let sqltitle = `UPDATE post SET title = '${req.body.title}' WHERE id = ${req.params.id} `;
  await connection.query(sqltitle, (err, result) => {
    console.log(result);
    if (err) {
      return res.status(400).json({ message: "erreur : on ne peut pas modifier le post name" });
    }
    console.log("Le title est modifié");
  });

  console.log("just wanna change CONTENT!");
  let sqlcontent = `UPDATE post SET content = '${req.body.content}' WHERE id = ${req.params.id} `;
  await connection.query(sqlcontent, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "erreur : on ne peut pas modifier le content" });
    }
    console.log("Le content est modifié");
  });
  res.status(201).json({ message: "Le content/ title est modifié." }); ///shows before sqls send
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
