const express = require('express');
const multer = require('multer');
//const auth = require('../middleware/auth');
const router = express.Router();

const postCtrl = require('../controlers/post');

router.post('/', multer, postCtrl.createPost);
router.get('/', postCtrl.showallposts);
router.post('/:id', postCtrl.liker);
router.put('/:id', multer, postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
/*
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.showallposts);
router.post('/:id', auth, postCtrl.liker);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
*/
module.exports = router;