const express = require('express');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const postvalidator = require('../middleware/postvalidator');
const router = express.Router();

const postCtrl = require('../controlers/post');

router.post('/', auth, multer, postvalidator, postCtrl.createPost);  
router.get('/', auth, postCtrl.showallposts);  // Like 9GAG equals without auth???   router.get('/', postCtrl.showallposts);  
router.get('/:id', auth, postCtrl.showOnepost); 
router.put('/:id', auth, multer, postvalidator, postCtrl.updatePost);  
router.delete('/:id', auth, postCtrl.deletePost);


module.exports = router;