const express = require('express');
const router = express.Router();

router.post('/user/register', (req, res) => {
  // Registration logic here
  res.status(201).json({ message: 'User registered successfully' });
});

module.exports = router;