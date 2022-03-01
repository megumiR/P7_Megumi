/********* importer des fichier , modules *************/
const bcrypt = require('bcrypt');
const utilisateur = require('../models/utilisateur');
const Utilisateur = require('../models/utilisateur');
//how does mysql export the model? 

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
/****** FIN: la logique pour signin  ************/


/****** la logique pour login -- l'authentification avec jwt pour login  ****************************/
/*
exports.login = (req, res, next) => {
    Utilisateur.findOne({ email: req.body.email })
        .then(utilisateur => {
            if (!utilisateur) {
                return res.status(401).json({ error: 'On ne trouve pas d\'utilisateur correspondant.'});
            }
            bcrypt.compare(req.body.password, utilisateur.password) //compare frontend data n database hashed data
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Le mot de passe est incorrect.' })
                    }
                    res.status(200).json({
                        utilisateurId: utilisateur._id, //_id?? id??
                        token: jwt.sign(
                            { utilisateurId: utilisateur._id },
                            'RAMDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => 
                    res.status(500).json({ error })
                );
        })
        .catch(error =>
            res.status(500).json({ error })
        );
};

*/