# SoPeckoko
Cinquième projet réalisé dans le cadre de ma formation Développeur web Openclassroom. Le but était mettre en place une API pour un site d'avis gastronomique. Je ne devais par conséquent m'occuper uniquement du backend du site, le frontend étant déjà fourni par OC.

# Identité
So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.

# Exigences concernant la sécurité
L’API doit respecter le RGPD et les standards OWASP :

- Le mot de passe des utilisateurs doit être chiffré.
- 2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données.
- La sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine.
- L’authentification est renforcée sur les routes requises.
- Les mots de passe sont stockés de manière sécurisée.
- Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.

# Erreurs API
Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire, utiliser une nouvelle Erreur().

# Routes API
Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Bearer <token>").

# Technologies utilisées
Node, Express, MongoDB.

# Tester le site en local

- Prérequis

Node.js, Angular et NPM

- Installation

npm install

nodemon (dans le dossier back)
npm start (dans le dossier front)
