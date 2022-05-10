const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const likeCtrl = require('../controlers/like');

router.post('/:id', auth, likeCtrl.liker);  
router.delete('/:id', auth, likeCtrl.removeLiker); 

module.exports = router;