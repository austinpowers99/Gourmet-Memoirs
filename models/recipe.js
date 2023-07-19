const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    recipeName: String,
    totalTime: Number,
    difficulty: String,
    servings: String,
    ingredients: String,
    recipe: String,
}, {
    timestamps:true
});

module.exports = mongoose.model('Recipe', recipeSchema);