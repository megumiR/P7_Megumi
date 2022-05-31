const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const likeCtrl = require('../controlers/like');

router.post('/:id', auth, likeCtrl.liker);  
router.put('/:id', auth, likeCtrl.removeLiker); 
router.get('/reaction/:id', auth, likeCtrl.isLiked);
router.get('/countLike/:id', auth, likeCtrl.showNumberOfLike);
router.get('/countDislike/:id', auth, likeCtrl.showNumberOfDislike);

module.exports = router;