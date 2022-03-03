
const express = require('express');
const router = express.Router();
//const utilisateur = require('../service/utilisateur');

const bcrypt = require('bcrypt');
const connection = require('../db__connection');  //importer l'info de mysql

//bring models
const Utilisateur = connection.query(
    'SHOW COLUMNS FROM utilisateur',
  //  'SELECT * FROM utilisateur',
    (error, results) => {
      console.log(results);
   //   res.render('../frontend/src/views/AccueilView.vue');
});
console.log("Utilisateur--->"); 
console.log(Utilisateur);

//la requete post pour signin    async function(req, res, next)??
router.post('/signin', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const utilisateur = new Utilisateur({
                name: req.body.name,
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
});


module.exports = router;