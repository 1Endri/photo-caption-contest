require('dotenv').config();
const express = require('express');
const path = require('path');  // <--- add this
const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads'))); // new line added

app.get('/', (req, res) => {
  res.send('Photo Caption Contest API is running!');
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
