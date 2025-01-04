// backend/app.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const roleRoutes = require('./routes/roleRoutes');

app.use('/api', roleRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
