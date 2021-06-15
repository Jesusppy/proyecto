const path = require('path');
const express = require('express');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const { Image } = require('../models');

const router = express.Router();

router.get('/images',  (req, res) => {
    res.render('images/imagenes')
});

router.post('/images', (req, res) => {
    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({filename : imgUrl});
        if (images.length > 0) {
            saveImage();
        } else {
            console.log(imgUrl);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)
    
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                await fs.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save();
                //res.redirect('/images');
                res.send('works');
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'Only images are allowed'});
            }   
        }
    };
    saveImage();
});

router.get('/images/list', async (req,res) => {
    const images = await Image.find().sort({timestamp: 1});
    res.render('images/list', {images});

});
/*  app.post('/images/:image_id', (req, res) => {
    
});

app.post('/images/:image_id/like',(req, res) => {
   
});

app.post('/images/:image_id/comment', (req, res) => {

});

app.delete('/images/:image_id', (req, res) => {

}); */

module.exports = router;