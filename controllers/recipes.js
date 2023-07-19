const Recipe = require('../models/recipe');

module.exports = {
    index,
    create,
    new: newRecipe,
    show,
    delete: deleteRecipe,
    edit,
    update
};

async function index(req, res) {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { title: 'Gourmet Mmeoirs', recipes });
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        console.log(req.body)
        const recipe = await Recipe.create(req.body);
        res.redirect(`/recipes`);
    } catch (err) {
       console.log(err)
       res.render('recipes/new', { errorMsg: err.message });
    }
}

function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add Recipe', errorMsg: '' });
}

async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    console.log(recipe)
    res.render('recipes/show', { title: 'Recipe Details', recipe });
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
    res.render('recipes/edit', { recipe });
}

async function update(req, res) {
    console.log(req.body)
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
        recipeName: req.body.recipeName,
        servings: req.body.servings,
        totalTime: req.body.totalTime,
        ingredients: req.body.ingredients,
        recipe: req.body.recipe,
        difficulty: req.body.difficulty
    })

    try {
      updatedRecipe.save();
      res.redirect('/recipes');
    }
        catch(err) {
        console.log(err);
        res.redirect('/recipes', { errorMsg: err.message});
    }
}