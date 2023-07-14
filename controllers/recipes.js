const Recipe = require('../models/recipe');

module.exports = {
    index,
    create,
    new: newRecipe,
    show,
    delete: deleteRecipe,
    edit,
    update,
};

async function index(req, res) {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { title: 'All Recipes', recipes });
}

async function create(req, res) {
    const Recipe = require('/models/recipes');
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        const recipe = await Recipe.create(req.body);
        res.redirect(`/recipes/${recipe._id}`);
    } catch (err) {
        res.render('recipes/new', { errorMsg: err.message });
    }
}

function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add Recipe', errorMsg: '' });
}

async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/show', { title: 'Recipe Details', recipe});
}

async function deleteRecipe(req, res) {
    try {
        await Recipe.deleteOne({_id: req.params.id});
        res.redirect('/recipes');
    } catch (err) {
        console.log(err)
    }
}

async function edit(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    console.log(recipe);
    res.render("recipes/edit", { recipe });
  }

async function update(req, res) {
    req.body.done = !!req.body.done;

    await Recipe.findById(req.params.id, req.body);
    res.redirect(`/recipes/${req.params.id}`);
}