const fs = require('fs');
const path = require('path');
const { Photo, User } = require('../models');
const imageProcessor = require('../utils/imageProcessor');

const sampleImages = [
  { title: 'Mountain Sunset', file: 'mountains.jpg' },
  { title: 'Ocean Waves', file: 'ocean.jpg' },
  { title: 'Forest Path', file: 'forest.jpg' },
  { title: 'City Skyline', file: 'city.jpg' }
];

async function seed() {
  const [user] = await User.findOrCreate({ 
    where: { username: 'demo' },
    defaults: {
      email: 'demo@example.com',
      password: 'demopassword'
    }
  });
  
  for (const img of sampleImages) {
    const imagePath = path.join(__dirname, 'sample_images', img.file);
    if (fs.existsSync(imagePath)) {
      const buffer = fs.readFileSync(imagePath);
      const { originalUrl, thumbnailUrl } = await imageProcessor.processUpload(buffer);
      
      await Photo.create({
        title: img.title,
        imageUrl: originalUrl,
        thumbnailUrl,
        userId: user.id
      });
    }
  }
  
  console.log('Added sample images');
}

seed().catch(console.error);
