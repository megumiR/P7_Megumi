//importer le package de npm 
const mailvalidator = require('email-validator');

module.exports = (req, res, next) => {  
    if (mailvalidator.validate(req.body.email)) {  
        next();
    } else {
        console.log({ error: "L'email n'est pas valide" });
    }
}