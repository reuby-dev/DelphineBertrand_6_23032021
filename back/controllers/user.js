const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createHmac } = require('crypto');
const secret = 'jaimelesponeysetinternetaussi'

exports.signup = (req, res, next) => {

    const hashEmail = createHmac('sha256', secret)
                      .update(req.body.email)
                      .digest('hex');

    bcrypt.hash(req.body.password, 10) //appelle la fonction de hachage et "sale" le mdp 10 fois
        .then(hash => {
            const user = new User({ //crée l'utilisateur
                email: hashEmail,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: 'utilisateur créé!'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {

  const hashEmail = createHmac('sha256', secret)
                    .update(req.body.email)
                    .digest('hex');

    User.findOne({ email: hashEmail }) //vérifie que l'email entré par l'utilisateur correspond à un utilisateur existant de la BDD
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
                  'uqYwBG0d4kti89T1MtOF',
                  {expiresIn: '24h'}
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};