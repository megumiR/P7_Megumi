/********* importer des fichier , modules *************/
const bcrypt = require("bcrypt");
const connection = require("../db__connection"); //importer l'info de mysql

const jwt = require("jsonwebtoken");

/****** la logique pour signin -- hash avec la fonction bcrypt pour le mot de passe ************/
exports.signup = async (req, res, next) => {
  console.log("signup post request---------");
  // if email already exists in database
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let sql = `INSERT INTO user (name, email, password, roll) VALUES                    
                ('${req.body.name}', '${req.body.email}', '${hashedPassword}', 'user')`;

  await connection.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json("Inscription impossible, un utilisateur est déjà déclaré pour cet email");
    }
    /////////// Need to get token for signup too so put these instead of //// res.status(201).json({ message: 'L\'info d\'user est bien inseré avec le nom: ' + req.body.name});
    let sql = `SELECT * FROM user WHERE email = '${req.body.email}' `;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(400).json("Une erreur s'est produite");
      }
      res.status(201).json({
        message: "L'info d'user est bien inseré avec le nom: " + req.body.name,
        userId: result[0].id,
        userName: result[0].name,
        token: jwt.sign(
          //new token cryptnize
          { userId: result[0].id },
          `${process.env.JWT_KEY}`,
          { expiresIn: "24h" }
        ),
        roll: result[0].roll,
      });
    });
  });
};

/****** Login  ********************/
exports.login = async (req, res, next) => {
  console.log("login post request---------");

  let sql = `SELECT * FROM user WHERE email = '${req.body.email}' `;
  await connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("L'info utilisateur: ", result);
    if (result.length > 0) {
      console.log("login preceeding...");
      bcrypt
        .compare(req.body.password, result[0].password) //compare frontend data n database hashed data
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Le mot de passe est incorrect." });
          }
          res.status(200).json({
            userId: result[0].id,
            userName: result[0].name,
            token: jwt.sign(
              //new token cryptnize
              { userId: result[0].id },
              `${process.env.JWT_KEY}`,
              { expiresIn: "24h" }
            ),
            roll: result[0].roll,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      return res.status(400).json({ error: "on ne trouve pas d'utilisateur correspondant." });
    }
  });
};
/************** get user account list*****************/
exports.getlist = async (req, res, next) => {
  console.log("Get the user accounts' list---------");
  let getAccounts = `SELECT * FROM user ORDER BY id asc`;  //asc desc
  await connection.query(getAccounts, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne peut pas chercher de tableau utilisateur",
      });
    }
    console.log("list: ", result);
    if (result.length > 0) {
      res.status(200).json({ result });
    } else {
      res.status(400).json({ message: "Il n'y a pas de compte à affichier !" });
    }
  });
};
/************* get one account *************/
exports.getoneaccount = async (req, res, next) => {
  console.log("one account---------");
  let oneAccount = `SELECT * FROM user WHERE id = ${req.params.id}`;
  await connection.query(oneAccount, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "erreur : on ne peut pas chercher de tableau account",
      });
    }
    res.status(200).json({ result });
  });
}; 


/************** delete an account *****************/
exports.deleteAccount  = async (req, res, next) => {
  let sqlDeleteAccount = `DELETE FROM user WHERE id = ${req.params.id}`;
  connection.query(sqlDeleteAccount, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "erreur : on ne peut pas supprimer ce compte" });
    }
  });
  
  res.status(200).json({ message: "Le compte est bien supprimé" });
};
