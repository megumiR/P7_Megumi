/********* importer des fichier , modules *************/
const connection = require("../db__connection"); //importer l'info de mysql
/********* FIN: importer des fichier , modules *************/


/************ Liker/ Disliker un post ******************/
exports.liker = async (req, res, next) => {
    console.log("Liker un post---------");
    console.log(req.userId);
    console.log("req body likes?" + req.body.likes);
   // console.log(JSON.stringify(req.body));
      // si l'user a deja Liké ce post et enregistré sur DB
    /*  let sqlFind = `SELECT * FROM post_likes WHERE post_id = '${req.params.id}' AND user_id = '${req.userId}'`;
      await connection.query(sqlFind, (err, res) => {
        if (err) {
          return res.status(400).json({ message: "erreur : savoir si c'est déjà Liker" });
        }
        console.log("step1:Already reacted to this post?");
      */  
        let sqlLike = `INSERT INTO post_likes (post_id, user_id, likes) VALUES ('${req.params.id}', '${req.userId}', '${req.body.likes}')`;
        await connection.query(sqlLike, (err, result) => {
            if (err) {
              return res.status(400).json({ message: "erreur : Liker pour la 1ere fois" });
            }
            console.log("Liker/ Disliker post pour la 1ere fois");
            res.status(200).json({ message: "Le Like/Dislike est enregistré." });
        });
     // });
  };
  /************ FIN: Liker/ Disliker un post ******************/
  /************ Enlever Liker/ Disliker  ******************/
  exports.removeLiker = async (req, res, next) => {
    console.log("remove Liker ---------");
      // si l'user a deja Liké ce post et enregistré sur DB
  /*    let sqlFind = `SELECT * FROM post_likes WHERE post_id = '${req.params.id}' AND user_id = '${req.userId}'`;
      connection.query(sqlFind, (err, res) => {
        if (err) {
          return res.status(400).json({ message: "erreur : il n'y a pas de post" });
        }
  */      // delete the existed result
        let sqlRemoveLike = `DELETE FROM post_likes WHERE post_id = '${req.params.id}' AND user_id = '${req.body.user_id}'`;
        await connection.query(sqlRemoveLike, (err, result) => {
            if (err) {
            return res.status(400).json({ message: "erreur : supprimer le Liker" });
            }
            console.log("Liker/ Disliker supprimé");
            res.status(200).json({ message: "Le Like/Dislike est supprimé." });
        });
 //     });  
  };
  /************ FIN: Liker/ Disliker un post ******************/
  
