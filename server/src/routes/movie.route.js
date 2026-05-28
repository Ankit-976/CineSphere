const express = require('express')
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authMiddleware = require('../middlewares/auth.middleware')

// Movie Routes

router.post('/addMovie', authMiddleware.authAdminMiddleware, movieController.addMovie);
router.get('/getMovies', movieController.getMovies);
router.post('/hideMovie/:id', authMiddleware.authAdminMiddleware, movieController.hideMovieById)
router.get('/getMovie/:id', authMiddleware.authUserMiddleware, movieController.getMovieById)

// Shows Routes

router.post('/addShow', authMiddleware.authAdminMiddleware, movieController.addShow);
router.get('/getShow/:showId', authMiddleware.authUserMiddleware, movieController.getShowById)

module.exports = router