/********* importer des fichier , modules *************/
const connection = require("../db__connection"); //importer l'info de mysql
/********* FIN: importer des fichier , modules *************/

/************ Liker/ Disliker un post ******************/
exports.liker = async (req, res, next) => {
  console.log("Liker un post---------");
  let sqlFind = `SELECT * FROM post_likes WHERE post_id = '${req.params.id}' AND user_id = '${req.body.user_id}'`;
  await connection.query(sqlFind, (err, res) => {
    if (err) {
      return res.status(500).json({ message: "erreur : savoir si c'est déjà Liker" });
    }
    console.log(res);
    // si l'user a deja Liké ce post et enregistré sur DB
    if (res.length > 0) {
      let sqlUpdateLike = `UPDATE post_likes SET likes = '${req.body.likes}' WHERE post_id = '${req.params.id}' AND user_id = '${req.body.user_id}'`;
      connection.query(sqlUpdateLike, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "erreur : modifier le Liker" });
        }
        console.log("Liker/ Disliker modifié");
      });
    } else {
      let sqlLike = `INSERT INTO post_likes (post_id, user_id, likes) VALUES ('${req.params.id}', '${req.body.user_id}', '${req.body.likes}')`;
      connection.query(sqlLike, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "erreur : Liker pour la 1ere fois" });
        }
        console.log("Liker/ Disliker post pour la 1ere fois");
      });
    }
    //  res.status(200).json({ message: "Le Like/Dislike est enregistré/modifié." });
  });
};
/************ FIN: Liker/ Disliker un post ******************/

/************ Enlever Liker/ Disliker  ******************/
exports.removeLiker = async (req, res, next) => {
  console.log("remove Liker ---------");
  let sqlUpdateLike = `UPDATE post_likes SET likes = '${req.body.likes}' WHERE post_id = '${req.params.id}' AND user_id = '${req.body.user_id}'`;
  await connection.query(sqlUpdateLike, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "erreur : modifier le Liker" });
    }
    console.log("Liker/ Disliker modifié");
    res.status(200).json({ message: "Le Like/Dislike est modifié." });
  });
};
/************ FIN: Liker/ Disliker un post ******************/

/******************* Afficher le nombre LIKE*********************/
exports.showNumberOfLike = async (req, res, next) => {
  console.log("number of likes---------");
  let countLikes = `SELECT COUNT(likes) as likes FROM post_likes WHERE post_id = ${req.params.id} AND likes = 1`;
  await connection.query(countLikes, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne peut pas chercher de nombre de like",
      });
    }
    res.status(200).json({ result });
  });
};
/******************* FIN: Afficher le nombre *********************/

/******************* Afficher le nombre DISLIKE*********************/
exports.showNumberOfDislike = async (req, res, next) => {
  console.log("number of dislikes---------");
  let countLikes = `SELECT COUNT(dislikes) as dislikes FROM post_likes WHERE post_id = ${req.params.id} AND likes = -1`;
  await connection.query(countLikes, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne peut pas chercher de nombre de dislike",
      });
    }
    res.status(200).json({ result });
  });
};
/******************* FIN: Afficher le nombre *********************/

/******************* Afficher le nombre *********************/
exports.isLiked = async (req, res, next) => {

  console.log("reaction like/dislike---------");
  console.log(req.body);
  console.log(req.userId);
  let check = `SELECT likes FROM post_likes WHERE post_id = ${req.params.id} AND user_id = '${req.userId}'`;
  await connection.query(check, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne peut pas chercher de nombre de like",
      });
    }
    res.status(200).json({ result });
  });
};
/******************* FIN: Afficher le nombre *********************/
