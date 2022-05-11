//importer le package de npm 
const validator = require('validator'); //import validator from 'validator';

module.exports = (req, res, next) => {  //
    if (validator.isAlphanumeric(req.body.title, req.body.content),['fr-FR']) {  //.validate -Methode à valider le mot de passe contre schema
        next();
    } else {
        return res.status(400).alert({ error: "Le mot de passe n'est pas assez fort : majuscule, minuscule, chiffres, pas de l'espace, plus que 8 caractaires" }).json({ error: "Le mot de passe n'est pas assez fort : majuscule, minuscule, chiffres, pas de l'espace, plus que 8 caractaires" });
       // console.log({ error: "Le mot de passe n'est pas assez fort : majuscule, minuscule, chiffres, pas de l'espace, plus que 8 caractaires" });
    }
}