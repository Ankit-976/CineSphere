const express = require('express')
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/addMovie', authMiddleware.authAdminMiddleware, movieController.addMovie)

module.exports = router