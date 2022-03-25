const express = require('express');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const router = express.Router();

const postCtrl = require('../controlers/post');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.showallposts);
router.post('/:id', auth, postCtrl.liker);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;