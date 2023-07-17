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

async function update(req, res, next) {
    try {
        const event = await Event.findById(req.params.id);

        for (let key in req.body) {
            if (event[key] !== req.body[key]) {
                event[key] = req.body[key];
            }
            console.log(event[key]);
            console.log(`req.body[${key}]= ${req.body[key]}`);
        }
        await event.save();
        res.redirect(`/recipes/${event._id}`);
    }
    catch (err) {
        next(err);
    }
}