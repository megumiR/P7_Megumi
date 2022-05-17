const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const likeCtrl = require('../controlers/like');

router.post('/:id', auth, likeCtrl.liker);  
router.put('/:id', auth, likeCtrl.removeLiker); 
router.get('/:id', auth, likeCtrl.showNumberOfLike);
router.get('/reaction/:id', auth, likeCtrl.isLiked);

module.exports = router;