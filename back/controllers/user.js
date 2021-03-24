const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
    User.findOne({ email: req.body.email }) //vérifie que l'email entré par l'utilisateur correspond à un utilisateur existant de la BDD
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) //compare le mdp entré par l'utilisateur avec le hash enregistré en BDD
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign( //encode un nouveau token
                  {userId: user._id}, //le token contient l'id de l'utilisateur
                  'RANDOM_TOKEN_SECRET',
                  {expiresIn: '24h'}
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};