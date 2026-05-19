const express = require('express')
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authMiddleware = require('../middlewares/auth.middleware')

// POST Routes

router.post('/addMovie', authMiddleware.authAdminMiddleware, movieController.addMovie);
router.post('/addShow', authMiddleware.authAdminMiddleware, movieController.addShow);

// GET Routes

router.get('/getMovies', movieController.getMovies);
router.get('/getShows/:movieId', movieController.getShows);

module.exports = router