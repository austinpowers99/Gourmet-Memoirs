const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST 
router.get('/recipes/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
// DELETE
router.delete('/recipes/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;