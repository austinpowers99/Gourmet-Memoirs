const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST 
router.post('/recipes/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
// DELETE
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;