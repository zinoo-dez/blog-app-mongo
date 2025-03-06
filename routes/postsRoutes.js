const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);// /posts
router.get('/create', postController.getCreatePost); // /posts/create
router.post('/create', postController.postCreatePost); // /posts/create
router.get('/edit/:id', postController.getEditPost);
router.post('/edit/:id', postController.postEditPost);
router.post('/delete/:id', postController.postDeletePost);

module.exports = router;
