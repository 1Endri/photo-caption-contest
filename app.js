require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Photo Caption Contest API is running!');
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
