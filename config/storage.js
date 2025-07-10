const path = require('path');
const fs = require('fs');

module.exports = {
  local: {
    storagePath: path.join(__dirname, '../public/uploads'),
    getPublicUrl: (filename) => /uploads/originals/,
    
    init: () => {
      const dirs = ['originals', 'thumbnails'];
      dirs.forEach(dir => {
        const dirPath = path.join(__dirname, ../public/uploads/);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
      });
    }
  }
};

module.exports.local.init();
