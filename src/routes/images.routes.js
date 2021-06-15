/* const express = require('express');
const imagesController = require('../controllers/imageController');
const { isAuthenticated } = require('../helpers/auth');

const router = express.Router();

router.get('/images', isAuthenticated , getListImage.imageController);

router.get('/images/:image_id', isAuthenticated , getImage.imageController);

router.post('/images/:image_id', isAuthenticated , postCreateImage.imageController);

router.post('/images/:image_id/like',isAuthenticated , postLikeImage.imageController);

router.post('/images/:image_id/comment',isAuthenticated , postCommentImage.imageController);

router.delete('/images/:image_id',isAuthenticated ,removeImage.imageController );

module.exports = router;  */