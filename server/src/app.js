const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/auth.route');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', userRoutes);


module.exports = app;