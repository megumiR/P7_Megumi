/********* importer des fichier , modules *************/
const bcrypt = require('bcrypt');
const connection = require('../db__connection');  //importer l'info de mysql 


const jwt = require('jsonwebtoken');

/****** la logique pour signin -- hash avec la fonction bcrypt pour le mot de passe ************/
exports.signup = async( req, res, next) => {
    console.log('signup post request---------');
    // if email already exists in database
    let checkEmailSQL = `SELECT * FROM utilisateur WHERE email = '${ req.body.email }' `;
    connection.query( checkEmailSQL, (err, result) => {
        if (err) {
            // If there is an issue with the query, output the error
            throw err;   
        }
        console.log('Result of checking db: ', result);
        
        if (result.length >0) {
        console.log('1 for existance of the same email' + result.length);           
        console.log('L\'email deja utilisé : ' + req.body.email);
        
        res.status(400).json({ message: 'L\'email deja existe'});
        }
    });
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    let sql = `INSERT INTO utilisateur (name, email, password, roll) VALUES 
            ('${ req.body.name }', '${ req.body.email }', '${hashedPassword}', 'user')`;
    
    await connection.query( sql, (err, result) => {
        if (err) {
            // If there is an issue with the query, output the error
            throw err;
        }
        console.log('L\'info signup est inseré avec le nom: ' + req.body.name);
        
        res.status(201).json({ message: 'L\'info d\'user est bien inseré avec le nom: ' + req.body.name});
    });
};


/****** Login  ********************/
exports.login = async(req, res, next) => {
    console.log('login post request---------');
    
    let sql = `SELECT * FROM utilisateur WHERE email = '${ req.body.email}' `;
    await connection.query( sql, (err, result) => {
      if (err) {
        // If there is an issue with the query, output the error
        throw err;
      }
      console.log('L\'info utilisateur: ', result);
      if (result.length >0) {
        console.log('login preceeding...');
        bcrypt.compare(req.body.password, result[0].password) //compare frontend data n database hashed data
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Le mot de passe est incorrect.' })
                    }
                    res.status(200).json({
                        utilisateurId: result[0].id,
                        token: jwt.sign(    //new token cryptnize
                            { utilisateurId: result[0].id },
                            'RAMDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        roll: result[0].roll
                    });
                    
                })
                .catch(error => 
                    res.status(500).json({ error })
                );
      } else {
        return res.status(400).json({ error: "on ne trouve pas d'utilisateur correspondant." });
    }
    });
};


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
    