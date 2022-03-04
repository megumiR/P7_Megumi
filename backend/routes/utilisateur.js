
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


//la requete post pour signin    async function(req, res, next)??
router.post('/signin', (req, res, next) => {
console.log('post request');

    /*   bcrypt.hash(req.body.password, 10)
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
        */
});


// http://localhost:3000/utilisateur/login
router.post('/login', (req, res, next) => {
	// Capture the input fields
	let username = req.body.username;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

// http://localhost:3000/posts
router.get('/posts', (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
	res.end();
});

module.exports = router;