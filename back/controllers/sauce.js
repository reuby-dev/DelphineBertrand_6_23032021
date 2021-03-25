const Sauce = require('../models/sauce');
const fs = require('fs'); //file system de node

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; //?
    console.log('sauce Object: ', sauceObject);
    const sauce = new Sauce({
        // objectID: req.body._id,    
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //req.protocol obtient 'http', ajoute '://', et résous l'hote du serveur, puis ajoute '/images/' et le nom du fichier pour compléter l'url
        // likes: 0,
        // dislikes: 0
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
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

// exports.modifyThing = (req, res, next) => {
//     const thingObject = req.file ? //regarde si req.file existe
//       {
//         ...JSON.parse(req.body.thing), //s'il n'existe pas, traite l'objet entrant
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//       } : { ...req.body };
//     Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id }) //s'il existe, traite la nouvelle image
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
// };

// exports.deleteThing = (req, res, next) => { 
//     Thing.findOne({ _id: req.params.id }) //utilise l'id recu comme paramètre pour accéder à la sauce correspondant dans la bdd
//       .then(thing => {
//         const filename = thing.imageUrl.split('/images/')[1]; //sépare le nom de fichier
//         fs.unlink(`images/${filename}`, () => { //supprime le fichier
//           Thing.deleteOne({ _id: req.params.id }) //le fichier à supprimer 
//             .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//             .catch(error => res.status(400).json({ error }));
//         });
//       })
//       .catch(error => res.status(500).json({ error }));
// };