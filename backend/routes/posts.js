const express = require('express');
const router = express.Router();

const connection = require('../db__connection');
/*
// ici ca marche
const Utilisateur = connection.query(  
    'SELECT * FROM post',
    (error, results) => {
        console.log('results: ');
        console.log(results);
        //res.render('../frontend/src/views/AccueilView.vue');
});  */

// http://localhost:3000/  router.get ne marche pas pour localhost:3000 --> cannot get/
router.get('/', (req, res) => {
    res.json({ message: 'get request for posts on home' });
    console.log('get request for localhost3000');
    console.log(res);
  // Render login template
  //res.sendFile(path.join(__dirname + '.')); //which file???
  })


module.exports = router;