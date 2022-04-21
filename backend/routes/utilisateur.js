const express = require('express');
const router = express.Router();//importer middleware pour la validation de mot de passe
const passvalidator = require('../middleware/passvalidator');

const utilisateurCtrl = require('../controlers/utilisateur');

router.post('/signup', passvalidator, utilisateurCtrl.signup);
router.post('/login', utilisateurCtrl.login);

module.exports = router;