const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memoirSchema = new Schema ({
    recipeName: String,
    totalTime: Number,
    difficulty: String,
    yield: Number,
    recipe: String
}, {
    timestamps:true
});