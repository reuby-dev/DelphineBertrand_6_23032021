const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]; //extrait le token de l'authorization de la requete entrante
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //décode le token, si invalide, une erreur sera générée
        const userId = decodedToken.userId; //extrait l'id utilisateur du token
        if (req.body.userId && req.body.userId !== userId) { //si la demande contient un id utilisateur, le comparer à celui extrait du token
            throw 'Invalid user ID'; //si différent, génère une erreur
        } else {
            next(); //utilisateur authentifié
        }
    }   catch {
        res.status(401).json({
            error: new Error('Invalid request !')
        });
    }
};