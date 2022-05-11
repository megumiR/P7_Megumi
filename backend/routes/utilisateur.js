const express = require('express');
const router = express.Router();//importer middleware pour la validation de mot de passe
const passvalidator = require('../middleware/passvalidator');
const mailvalidator = require('../middleware/mailvalidator');

const utilisateurCtrl = require('../controlers/utilisateur');

router.post('/signup', passvalidator, mailvalidator, utilisateurCtrl.signup);
router.post('/login', mailvalidator, utilisateurCtrl.login);

module.exports = router;