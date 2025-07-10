const path = require('path');
const fs = require('fs');

const storagePath = path.join(__dirname, '../public/uploads');

const storage = {
  local: {
    storagePath,
    
    getPublicUrl: (filename) => `/uploads/originals/${filename}`, // <- fixed return

    init: () => {
      const dirs = ['originals', 'thumbnails'];
      dirs.forEach(dir => {
        const dirPath = path.join(storagePath, dir); // <- fixed path
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
      });
    }
  }
};

storage.local.init();

module.exports = storage;

