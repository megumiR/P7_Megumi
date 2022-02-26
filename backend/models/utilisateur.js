//enlever mongoose apres 
const mongoose = require('mongoose');

//Rechercher unique email validateur pour mySQL

//changer le schema car cest mongoose schema 
/* connection.query('CREATE TABLE NOT EXISTS Utilisateurs ( id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30), email VARCHAR(255), password VARCHAR(100)??? );', function(err) {
    if (err) {
        throw err;
    }
    console.log('Utilisateur TABLE crée !');
});
*/
const utilisateurSchema = mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true}
});


module.exports = mongoose.model('Utilisateur', utilisateurSchema);