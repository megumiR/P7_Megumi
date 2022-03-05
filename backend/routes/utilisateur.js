const express = require('express');
const router = express.Router();

const utilisateurCtrl = require('../controlers/utilisateur');

router.post('/signup', utilisateurCtrl.signup);
router.post('/login', utilisateurCtrl.login);

module.exports = router;