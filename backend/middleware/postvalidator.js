//importer le package de npm
const { validationResult } = require("express-validator"); 

module.exports = (req, res, next) => {
  console.log("auth express-validator reqbody:");
  console.log(req.body);
  if (!req.body.title || !req.body.content || req.body.title.length > 20 || req.body.content.length > 150) {
   console.log("title/content est vide/trop long");
   const errors = validationResult(req);
   return res.status(400).json({ errors: errors.array() });
  }
  next(); 
  
 /* 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 */
        //return res.status(400).json({ error: "Le title n'est pas valide" })
};