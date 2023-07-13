const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');

// GET /recipes
router.get('/', recipesCtrl.index);
// GET /recipes/new
router.get('/new', recipesCtrl.new);
// GET /recipes/:id (show functionality) MUST be below new route
router.get('/:id', recipesCtrl.show);

module.exports = router;