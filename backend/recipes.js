const mongoose = require('mongoose');

const addRecipeSchema = mongoose.Schema({
    recipeName: {
        type: 'string',
    },
    foodClass: {
        type: 'string'
    },
    foodType: {
        type: 'string',
    },
    recipe: {
        type: 'string',
    },
}, { versionKey: false })

module.exports = recipeModel = mongoose.model("Recipe", addRecipeSchema);