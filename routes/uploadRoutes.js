const express = require('express');
const multer = require('multer');
const { Photo } = require('../models');
const imageProcessor = require('../utils/imageProcessor');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const { originalUrl, thumbnailUrl } = await imageProcessor.processUpload(req.file.buffer);
    
    const photo = await Photo.create({
      title: req.body.title || 'Untitled',
      imageUrl: originalUrl,
      thumbnailUrl,
      caption: req.body.caption,
      userId: req.user.id // Assuming you have authentication
    });

    res.status(201).json(photo);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Image processing failed' });
  }
});

module.exports = router;
