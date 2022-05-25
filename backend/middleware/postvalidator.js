//importer le package de npm
const { body, validationResult } = require("express-validator"); //import validator from 'validator';
//
module.exports = (req, res, next) => {
  body(req.body.title).isLength({ min: 1 }) && body(req.body.content).isLength({ min: 1 } && body(req.body.content).isLength({ max: 150 }), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    //    return res.status(400).json({ error: "Le title ou/et la discription n'est pas valide" });
        }
        next();   
    }
  };

/***
 //importer le package de npm
const validator = require("validator"); //import validator from 'validator';

module.exports = (req, res, next) => {
  //['fr-FR'] nodemon craches  when there is special caracters ....
  console.log("post validator entred....");
  //if (validator.isAlpha(req.body.title)) {  //.validate -Methode à valider le mot de passe contre schema
  if (validator.isLength(req.body.title)) {
    console.log("postvalidator 1:title is ok");
    if ((validator.isLength(req.body.content), 2, 150)) {
      // isLength not working
      next();
    } else {
      res.status(400).json({ error: "La discription n'est pas valide" });
      console.log("postvalidator 2 : content is not ok");
    }
  } else {
    return res.status(400).json({ error: "Le title n'est pas valide" });
    // console.log({ error: "Le mot de passe n'est pas assez fort : majuscule, minuscule, chiffres, pas de l'espace, plus que 8 caractaires" });
  }
};
 */