const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

const photoRoutes = require('./routes/photoRoutes');
app.use('/api', photoRoutes);

app.get('/', (req, res) => {
  res.send('Photo Caption Contest API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
