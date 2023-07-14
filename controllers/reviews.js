const Recipe = require('../models/movie');

module.exports = {
    create,
    delete: deleteReview
};

async function create(req, res) {
    const recipe = await Recipe.findById(req.params.id);

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    recipe.reviews.push(req.body);
    try {
        await recipe.save();
    } catch(err) {
        console.log(err)
    }
    res.redirect(`/recipes/${recipe._id}`);
}

async function deleteReview(req, res) {
    const recipe = await Recipe.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id })

    if (!recipe) return res.redirect('/recipes'); //update when you know WHERE to redirect.

    recipe.reviews.remove(req.params.id);
    await recipe.save();
    res.redirect(`/recipes/${book._id}`);
}