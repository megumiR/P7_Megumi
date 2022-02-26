/********* importer des fichier , modules *************/
const bcrypt = require('bcrypt');
const Utilisateur = require('../models/utilisateur');
//const jwt = require('jsonwebtoken');


/****** la logique pour signin -- hash avec la fonction bcrypt pour le mot de passe ************/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const utilisateur = new Utilisateur({
                email: req.body.email,
                password: hash
            });
            utilisateur.save()  //mySQL save like this too?
                .then(() => 
                    res.status(201).json({ message: 'Utilisateur est crée'})
                )
                .catch(error =>
                    res.status(400).json({ error })    
                );
        })
        .catch(error =>
            res.status(500).json({ error })
        );
};


