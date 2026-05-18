const express = require('express')
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/addMovie', authMiddleware.authAdminMiddleware, movieController.addMovie);
router.post('/addShow', authMiddleware.authAdminMiddleware, movieController.addShow);

module.exports = router