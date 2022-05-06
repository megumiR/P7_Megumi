const express = require('express');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const router = express.Router();

const postCtrl = require('../controlers/post');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.showallposts);  // Like 9GAG equals without auth???   router.get('/', postCtrl.showallposts);  
router.get('/:id', auth, postCtrl.showOnepost); 
router.post('/like/:id', auth, postCtrl.liker);  //'/like/:id' ? or '/:id' ?
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;