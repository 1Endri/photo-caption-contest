module.exports = {
  processUpload: async (buffer) => {
    // For now, just return dummy URLs so upload route works
    return {
      originalUrl: '/uploads/originals/dummy.jpg',
      thumbnailUrl: '/uploads/thumbnails/dummy-thumb.jpg'
    };
  }
};
