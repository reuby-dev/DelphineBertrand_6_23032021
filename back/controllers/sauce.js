const Sauce = require('../models/sauce');
const fs = require('fs'); //file system de node pour la gestion des images

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({ 
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //req.protocol obtient 'http', ajoute '://', et résous l'hote du serveur,
        // puis ajoute '/images/' et le nom du fichier pour compléter l'url
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};


exports.likeSauce = (req, res, next) => {
    console.log(req.body);
    const like = req.body.like;
    const userId = req.body.userId;

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const hasLiked = sauce.usersLiked.includes(userId); //renvoie vrai ou faux, permet de vérifier la présence de l'id de l'utilisateur dans le tableau usersLiked
            const hasDisliked = sauce.usersDisliked.includes(userId);
            const hasNotInteractedYet = !hasLiked && !hasDisliked;

            if (hasNotInteractedYet) {
                let updateQuery = {};
                let message = "";
                
                if(like === 1) {
                    updateQuery = {$push: {usersLiked: userId}, $inc: {likes: +1}};
                    message = 'sauce aimée';
                        
                } else if (like === -1) {
                    updateQuery = {$push: {usersDisliked: userId}, $inc: {dislikes: +1}};
                    message = 'sauce non aimée';
                }

                return Sauce.updateOne({ _id: req.params.id }, updateQuery)
                    .then(() => res.status(200).json({ message }))
                    .catch(error => res.status(400).json({error}));
            }

            if (like === 0) {
                let updateQuery = {};
                let message = "";
                if (hasLiked) {
                    updateQuery = {$pull: {usersLiked: userId}, $inc:{ likes: -1}};
                    message =  "Annulation - Sauce aimée"
                } else if (hasDisliked) {
                    updateQuery = {$pull: {usersDisliked: userId}, $inc:{ dislikes: -1}};
                    message =  "Annulation - Sauce non aimée"
                    
                }
                return Sauce.updateOne({ _id: req.params.id },updateQuery )
                    .then(() => res.status(200).json({ message }))
                    .catch(error => res.status(400).json({error}));
            }          
        })
};


exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );  
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            console.log(sauce);
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? //regarde si req.file existe
      {
        ...JSON.parse(req.body.sauce), //s'il n'existe pas, traite l'objet entrant
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //s'il existe, traite la nouvelle image
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => { 
    Sauce.findOne({ _id: req.params.id }) //utilise l'id recu comme paramètre pour accéder à la sauce correspondant dans la bdd
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]; //sépare le nom de fichier
        fs.unlink(`images/${filename}`, () => { //supprime le fichier
          Sauce.deleteOne({ _id: req.params.id }) //le fichier à supprimer 
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

