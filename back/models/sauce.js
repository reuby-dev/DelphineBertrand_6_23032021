const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    // objectID: {type: String, required: true},
    // userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    // imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    // likes: {type: Number, required: true},
    // dislikes: {type: Number, required: true},
    // userLiked: {[]},
    // userDisliked: {[]},
});

module.exports = mongoose.model('Sauce', sauceSchema);