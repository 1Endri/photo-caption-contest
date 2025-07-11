const { Photo, Comment } = require('../models');

async function getAllPhotos(req, res) {
  try {
    const photos = await Photo.findAll({
      where: { deleted_at: null },
      include: [{
        model: Comment,
        where: { deleted_at: null },
        required: false
      }]
    });
    res.json(photos);
  } catch (error) {
    console.error('Get all photos error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPhotoById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid photo ID' });
    }

    const photo = await Photo.findByPk(id, {
      include: [{
        model: Comment,
        where: { deleted_at: null },
        required: false
      }],
      where: { deleted_at: null }
    });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    res.json(photo);
  } catch (error) {
    console.error('Get photo by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function addCaption(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { content } = req.body;

    if (isNaN(id) || !content) {
      return res.status(400).json({ error: 'Invalid photo ID or caption content' });
    }

    const photo = await Photo.findByPk(id);
    if (!photo || photo.deleted_at) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const newComment = await Comment.create({
      content,
      photo_id: id
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Add caption error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllPhotos,
  getPhotoById,
  addCaption
};
