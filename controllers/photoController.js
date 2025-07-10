const { Photo, Comment } = require('../models');

module.exports = {
  // GET /photos
  getAllPhotos: async (req, res) => {
    try {
      const photos = await Photo.findAll();
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch photos' });
    }
  },

  // GET /photos/:id
  getPhotoById: async (req, res) => {
    try {
      const photo = await Photo.findByPk(req.params.id, {
        include: [{ model: Comment }]
      });

      if (!photo) return res.status(404).json({ error: 'Photo not found' });

      res.json(photo);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving photo' });
    }
  },

  // POST /photos/:id/captions
  addCaption: async (req, res) => {
    try {
      const { text } = req.body;
      const photo = await Photo.findByPk(req.params.id);

      if (!photo) return res.status(404).json({ error: 'Photo not found' });

      const comment = await Comment.create({
        text,
        photo_id: photo.id
      });

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add caption' });
    }
  }
};
