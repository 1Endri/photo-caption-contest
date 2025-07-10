const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

router.get('/photos', photoController.getAllPhotos);
router.get('/photos/:id', photoController.getPhotoById);
router.post('/photos/:id/captions', photoController.addCaption);

module.exports = router;
