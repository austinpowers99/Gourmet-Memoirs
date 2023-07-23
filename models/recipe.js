const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    content: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: String
    }, {
      timestamps: true
    });

const recipeSchema = new Schema ({
    recipeName: String,
    totalTime: Number,
    difficulty: String,
    servings: String,
    ingredients: String,
    instructions: String,
    reviews: [reviewSchema],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('Recipe', recipeSchema);
