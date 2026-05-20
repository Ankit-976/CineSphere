const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/auth.route');
const movieRoutes = require('./routes/movie.route');
const bookingRoutes = require('./routes/booking.route')

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/booking', bookingRoutes);


module.exports = app;