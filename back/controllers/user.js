const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //appelle la fonction de hachage et "sale" le mdp 10 fois
        .then(hash => {
            const user = new User({ //crée l'utilisateur
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: 'utilisateur créé!'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {

};