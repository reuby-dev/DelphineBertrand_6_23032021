const express = require('express');
const app = express();
const mongoose = require('mongoose');
//path du serveur
const path = require('path');
//routeurs
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://reuby:test@cluster0.vhv8q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //accède à l'api depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajoute les headers aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoie les requêtes avec les méthodes mentionnées
    next();
});

//body parser
app.use(express.json());

//gestionnaire de routage des images statique
app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;