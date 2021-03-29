const Sauce = require('../models/sauce');
const fs = require('fs'); //file system de node

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({ 
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //req.protocol obtient 'http', ajoute '://', et résous l'hote du serveur, puis ajoute '/images/' et le nom du fichier pour compléter l'url
        like: 0,
        dislike: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    // console.log(sauce);
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};


exports.likeSauce = (req, res, next) => {
    const like = req.body.like;
    const dislike = req.body.dislike;
    const userId = req.body.userId;
    const usersLiked = [];
    const usersDisliked = [];

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            switch(like){
                case -1:
                    console.log('cas -1', req.body),
                    sauce.updateOne(
                        {$push: {usersDisliked: userId}, $inc: {dislike: +1}}
                    )
                .then(() => res.status(200).json({ message: 'sauce non aimée'}))
                .catch(error => res.status(400).json({error}));
                break;

                case 0 :
                    sauce.updateOne(
                        console.log('cas 0', req.body),
                        {$splice: {usersLiked: userId}, $inc: {like: -1}}
                    )
                .then(() => res.status(200).json({ message: 'annulation sauce aimée'}))
                .catch(error => res.status(400).json({error}));
                break;

                case 1 :
                    sauce.updateOne(
                        console.log('cas 1', req.body),
                        {$push: {usersLiked: userId}, $inc: {like: +1}},
                    )
                .then(() => res.status(200).json({ message: 'annulation sauce aimée'}))
                .catch(error => res.status(400).json({error}));
                break;
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

