const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

router.get('/', photoController.getAllPhotos);
router.get('/:id', photoController.getPhotoById);
router.post('/:id/captions', photoController.addCaption);

module.exports = router;
