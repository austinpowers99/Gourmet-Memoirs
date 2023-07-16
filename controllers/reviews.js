const Recipe = require("../models/recipe");

module.exports = {
  create,
  delete: deleteReview,
};

async function create(req, res) {
  const recipe = await Recipe.findById(req.params.id);

  req.body.user = req.user._id;
  req.body.userName = req.user.name;

  recipe.reviews.push(req.body);
  try {
      await recipe.save();
  } catch (err) {
      console.log(err);
  }
  res.redirect(`/recipes/${recipe._id}`);
}

async function deleteReview(req, res) {
  const recipe = await Recipe.findOne({
    "reviews._id": req.params.id,
    "reviews.user": req.user._id,
});
  console.log(recipe);
  if (!recipe) return res.redirect("/recipes");const Recipe = require("../models/recipe");
  recipe.reviews.remove({ _id: req.params.id });

  await recipe.save();
  // Redirect back to home page
  res.redirect(`/recipes/${recipe._id}`);
}