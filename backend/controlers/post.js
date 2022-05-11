/********* importer des fichier , modules *************/
const connection = require("../db__connection"); //importer l'info de mysql
//const fetch = require("node-fetch");
const fs = require("fs");
/********* FIN: importer des fichier , modules *************/

/***************** Creer un post  ***************/ 
exports.createPost =
  /////////// s'il y a un fichier {oui traiter l'image}:{non traiter que l'objet}
  async (req, res, next) => {
    console.log("post one article---------"); 
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
    } else {
      console.log("Il y a une image");
      console.log(req.file.filename);
      let imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

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
exports.showallposts = async (req, res, next) => {
  console.log("home with posts---------");
  let allPost = `SELECT * FROM post`;
  await connection.query(allPost, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne peut pas chercher de tableau post",
      });
    }
    console.log("posts: ", result);
    var allPostWithImg = [];
    if (result.length > 0) {
      result.forEach( post => {
        if ( post.image != null) { 
          post.image = `${req.protocol}://${req.get("host")}/images/${post.image}`;
          
          allPostWithImg.push(post);
        } else {
          allPostWithImg.push(post);
        }
      });
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
    console.log(result[0].image);
    if ( result[0].image != null) {
      result[0].image = `${req.protocol}://${req.get("host")}/images/${result[0].image}`;
    }
    console.log(result[0].image);
    res.status(200).json({ result });
  });
};
/******************* FIN: Afficher le post *********************/


/************* Modifier un post **************/
exports.updatePost = async (req, res, next) => {
  ///not considered -> change image
  console.log("update specific post---------");
  let sqltitle = `UPDATE post SET title = '${req.body.title}' WHERE id = ${req.params.id} `;
  await connection.query(sqltitle, (err, result) => {
    console.log(result);
    if (err) {
      return res.status(400).json({ message: "erreur : on ne peut pas modifier le post name" });
    }
    console.log("Le title est modifié");
  });

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
  console.log("delete post ------>");
  let sqlSelect = `SELECT * FROM post WHERE id = ${req.params.id}`;
  await connection.query(sqlSelect, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "erreur : probleme de mySQL" });
    }
    console.log(result[0].image);
    if (result[0].image) {
      fs.unlink(`./images/${result[0].image}`, (err) => {
        if (err) {
          throw err;
        }
        let sqlDelete = `DELETE FROM post WHERE id = ${req.params.id}`;
        connection.query(sqlDelete, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "erreur : on ne peut pas supprimer" });
          }
          res.status(200).json({ message: "Le post est bien supprimé" });
        })
      })
    } else {
      let sqlDelete = `DELETE FROM post WHERE id = ${req.params.id}`;
      connection.query(sqlDelete, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "erreur : on ne peut pas supprimer" });
        }
        res.status(200).json({ message: "Le post est bien supprimé" });
        console.log(result);
      });
    }   
  });
};
/************* FIN: Supprimer un post ******************/
