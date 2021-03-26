const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //pré-valide les informations avant de les enregistrer

const userSchema = mongoose.Schema({
    userId: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator); //aucun des deux utilisateurs ne peut partager la meme adresse mail

module.exports = mongoose.model('User', userSchema);