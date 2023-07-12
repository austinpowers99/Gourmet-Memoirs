const Recipe = require('../models/recipe');

module.exports = {
    index,
    create,
    new: newRecipe,
    show
};

async function index(req, res) {
    const movies = await Recipe.find({});
    res.render('recipes/index', { title: 'All Recipes', recipes });
}

async function create(req, res) {
    const Recipe = require('/models/recipe');

    try {
        await Recipe.create(req.body);
        res.redirect('/recipes/new');
    } catch (err) {
        res.render('recipes/new', { errorMsg: err.message });
    }
}

function newRecipe(req, res) {
    res.render('recipes/new', { errorMsg: '' });
}

async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    res.render('books/show', { title: 'Recipe Details', recipe});
}