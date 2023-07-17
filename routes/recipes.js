const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');
// all endpaths have /recipes

 
// GET /recipes
router.get('/', recipesCtrl.index);
// GET /recipes/new
router.get('/new', recipesCtrl.new);
// GET /recipes/:id (show functionality) MUST be below new route
router.get('/:id', recipesCtrl.show);
// GET /recipes/:id/edit
router.get('/:id/edit', recipesCtrl.edit)
// POST /recipes
router.post('/', recipesCtrl.create);
// DELETE /recipes/:id
router.delete('/:id', recipesCtrl.delete)
// POST(EDIT)


module.exports = router;