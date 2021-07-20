const path = require('path');
const express = require('express');
const { isAuthenticated } = require('../helpers/auth');
const { randomNumber } = require('../helpers/libs');
const { timeago } = require('../config/helpers');
const fs = require('fs-extra');
const { Image, Comment } = require('../models');
const md5 = require('md5');
const sidebar = require('../helpers/sidebar');
const images = require('../helpers/images');
const router = express.Router();


router.get('/images', isAuthenticated, async (req, res) => {
    const images = await Image.find().sort({ timestamp: -1 });
    let viewModel = { images: [] };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    console.log(viewModel);
    res.render('images/imagenes', viewModel);
});

router.post('/images/imagenes',isAuthenticated,  (req, res) => {
    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({ filename: imgUrl });
        if (images.length > 0) {
            saveImage();
        } else {
            console.log(imgUrl);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save();

                res.redirect('/images/' + imgUrl);
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({ error: 'Only images are allowed' });
            }
        }
    };
    saveImage();
});

router.get('/images/:image_id',isAuthenticated,  async (req, res) => {
    let viewModel = { image: {}, comments: {} };
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
    if (image) {
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({ image_id: image._id });
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);

        res.render('images/image', {  timeago, ...viewModel });
    } else {
        res.redirect('/images');
    }
});

router.post('/images/:image_id/comment',isAuthenticated,  async (req, res) => {
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
    } else {
        res.redirect('/images');
    }
});

router.post('/images/:image_id/like',isAuthenticated,  async (req, res) => {
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } })
    if (image) {
        image.likes = image.likes + 1;
        await image.save();
        res.json({ likes: image.likes });
    } else {
        res.status(500).json({ error: 'Internal Error' });
    }
});

router.delete('/images/:image_id',isAuthenticated,  async (req, res) => {
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } })
    if (image) {
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        await Comment.deleteOne({ image_id: image._id });
        await image.remove();
        res.json(true);
        res.redirect('/images');
    }
});

module.exports = router;