const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memoirSchema = new Schema ({
    recipeName: String,
    totalTime: Number,
    difficulty: String,
    yield: String,
    recipe: String,
}, {
    timestamps:true
});

module.exports = mongoose.model('Recipe', recipeSchema);