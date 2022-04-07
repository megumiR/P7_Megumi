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
      console.log("test manu");
    if (err) {
      return res.status(400).json("Inscription impossible, un utilisateur est déjà déclaré pour cet email");
    }
    console.log("test manu2");
    console.log("L'info signup est inseré avec le nom: " + req.body.name);
    /////////// Need to get token for signup too so put these instead of //// res.status(201).json({ message: 'L\'info d\'user est bien inseré avec le nom: ' + req.body.name});
    let sql = `SELECT * FROM user WHERE email = '${req.body.email}' `;
    connection.query(sql, (err, result) => {
      if (err) {

        return res.status(400).json("Une erreur s'est produite");
      }
      res.status(201).json({
        message: "L'info d'user est bien inseré avec le nom: " + req.body.name,
        userId: result[0].id,
        token: jwt.sign(
          //new token cryptnize
          { userId: result[0].id },
          "RAMDOM_TOKEN_SECRET",
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
            return res
              .status(401)
              .json({ error: "Le mot de passe est incorrect." });
          }
          res.status(200).json({
            userId: result[0].id,
            token: jwt.sign(
              //new token cryptnize
              { userId: result[0].id },
              "RAMDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
            roll: result[0].roll,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      return res
        .status(400)
        .json({ error: "on ne trouve pas d'utilisateur correspondant." });
    }
  });
};
