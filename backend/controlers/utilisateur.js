/********* importer des fichier , modules *************/
const bcrypt = require('bcrypt');
const connection = require('../db__connection');  //importer l'info de mysql 


//const jwt = require('jsonwebtoken');

/****** la logique pour signin -- hash avec la fonction bcrypt pour le mot de passe ************/
exports.signup = async( req, res, next) => {
    console.log('signup post request');
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    let sql = `INSERT INTO utilisateur (name, email, password) VALUES 
        ('${ req.body.name }', '${ req.body.email }', '${hashedPassword}')`;
   /// let sql = `INSERT INTO utilisateur (name, email, password) VALUES 
    //  ('${ req.body.name }', '${ req.body.email }', '${ req.body.password }')`;
    await connection.query( sql, (err, result) => {
    // if email already exists in database
      let checkEmailSQL = `SELECT * FROM utilisateur WHERE email LIKE ${ req.body.email } `;
      if (checkEmailSQL.length >0) {
        console.log('L\'email deja utilisé : ');
        console.log(req.body.email);
        res.json({ message: 'L\'email deja existe'});
      } 
      if (err) {
        throw err;
      }
      console.log('L\'info signup est inseré avec le nom: ');
      console.log(req.body.name);
    });
};

exports.login = async(req, res, next) => {
    console.log('login post request');
    
    let sql = `SELECT name, email, password FROM utilisateur WHERE email = '${ req.body.email}' `;
    await connection.query( sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('L\'info utilisateur: ', result);
      if (result.length >0) {
        console.log('login ok');
        bcrypt.compare(req.body.password, utilisateur.password) //compare frontend data n database hashed data
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Le mot de passe est incorrect.' })
                    }
                    res.status(200).json({
                        utilisateurId: utilisateur._id,
                        token: jwt.sign(    //new token cryptnize
                            { utilisateurId: utilisateur._id },
                            'RAMDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                    // Redirect to home page
                    res.redirect('/api/posts');
                })
                .catch(error => 
                    res.status(500).json({ error })
                );
      } else {
        //res.json({ message : 'le nom et/ou l\'email et/ou le mot de passe incorrecte' });
        return res.status(401).json({ error: "on ne trouve pas d'utilisateur correspondant." });
    }
    });
};

/*P6--
    (req, res, next) => {
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
/********copy   
app.get('/', (req, res) => {
    //res.json({ message: 'ok' });
    connection.query(
        'SELECT * FROM utilisateur',
        (error, results) => {
          console.log(results);
       //   res.render('../frontend/src/views/AccueilView.vue');
    }); 
});*/
//COPIED.. la requete post pour 
/*    router.post('/login', (req, res, next) => {
        // Capture the input fields
        let username = req.body.username;
        let password = req.body.password;
        // Ensure the input fields exists and are not empty
        if (username && password) {
            // Execute SQL query that'll select the account from the database based on the specified username and password
            connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?',
             [username, password], function(error, results, fields) {
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
*/    
    