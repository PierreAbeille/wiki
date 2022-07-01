## Description du Projet ##

Bienvenue sur notre projet de wiki, développé par Yohann MARKUC, Pierre ABEILLE et StackOverflow.
Dans cette documentation, nous allons vous présenter nos fonctionnalités, nos choix techniques et nos justifications quant aux décisions qui ont été prises pour implémenter cette application.

## Description des fonctionnalités ##

### Articles ###

Il est possible de créer des articles, de les modifier, les supprimer et ajouter des versions.
L'utilisateur qui modifie un article est libre d'en faire une nouvelle version, ou non.
Ce choix est justifié par le fait qu'un utilisateur voulant corriger une faute de frappe n'a pas besoin de faire de nouvelle version.

Nous sommes conscients qu'un utilisateur pourrait faire de gros changements sans ajouter de version, mais c'est un choix que nous avons pris.

### Catégories ###

Les catégories permettent de ranger des articles.
Par exemple dans la catégorie "cuisine", on trouvera tous les articles liés à la cuisine, comme des recettes.

### Tags ###

Les tags sont des mots-clés qui permettent de retrouver un article via la recherche.
Si on reprend notre exemple de cuisine, des tags possibles sont "pizza","recette","cake".

## Manuel d'installation ##

### 1) ###

Lancer le serveur back. 
Le serveur node est programmé pour se lancer sur le port 3000
Depuis le dossier BACK :
- node index.js

ou

- nodemon index.js

### 2) ###

Lancer l'application React.
Elle est configurée pour se lancer sur le port 3001
Depuis le dossier FRONT/wiki_front :
- npm run dev

### 3) ###

Initialiser la base de données. 
Pour ça, se rendre dans un navigateur et aller à l'adresse suivante :
- http://localhost:3000/api/db/init 

Si la base de données a bien été initialisée, le serveur renverra la réponse suivante :

 > Bdd initialisée

## Contrat d'interface ##


## Documentation API ##

#### Initialisation ####

> /api/db/init GET
Initialise la base de données.

#### articles ####

> /articles GET
Retourne tous les articles

> /articles POST
Ajoute un article depuis une page de formulaire

> /articles/:id GET
Retourne l'article ayant pour identifiant **id**

> /articles/:id DELETE
Supprime l'article ayant pour **_NOM_** **id**
Le fait d'utiliser un nom ici et non pas un id, permet de supprimer tous les articles d'un même nom.

> /articles/:id PUT
Met à jour l'article ayant pour identifiant **id**

**ATTENTION** : Lorsque l'on change le titre d'un article, un nouvel article est créé.
En effet, dans notre modèle, nous avons décidé d'effectuer le tri par titre d'article.
Nous sommes partis du principe qu'un article allait garder le même titre.

La méthode a deux fonctions :

- Soit mettre à jour l'article sans faire de nouvelle version

- Soit le dupliquer pour en faire une version plus récente

> /article/restore/:id PUT

Cette méthode permet de restaurer un article à la version choisie.
En appliquant cette méthode, l'ancienne date liée à l'article est supprimée.


> /articlesCategorie/:id GET

Retourne tous les articles ayant pour *categorie* la chaîne de caractères **id** 

#### categories ####

> /categories GET
Retourne toute les catégories

> /categories POST
Ajoute une catégorie via le biais d'un formulaire

> /categories/:id GET
Retourne la catégorie ayant pour identifiant **id**

> /categories/:id PUT 
Met à jout la catégorie ayant pour identifiant **id**
La méthode permet aussi de modifier les articles liés à la catégorie modifiée, en changeant leur attribut "catégorie" dans la base de données.

> /categories/:id DELETE
Supprime la catégorie ayant pour identifiant **id**

#### tags ####

> /tags GET
Retourne tous les tags

> /tags POST
Modifie un tag via le biais d'un formulaire

> /tags/:id GET
Retourne le tag ayant pour identifiant **id**

> /tags/:id DELETE
Supprime le tag ayant pour identifiant **id**

> /tags/:id PUT
Met à jour le tag ayant pour identifiant **id**
La méthode permet aussi de modifier les articles liés au tag modifié, en changeant leur attribut "tags" dans la base de données.

#### Autres ####

> /search/:string 
Retourne tous les articles qui correspondent à l'entrée *string* dans la barre de recherche, 
Soit par 
- tag
- titre

exemple :
Si je fais une recherche "Bonjour", et qu'un article a pour titre "Bonjour" ou alors un tag "Bonjour", l'article sera retourné
Pour le moment la requête est sensible à la casse et ne permet pas encore de trouver un article qui comporte plus de mots que la recherche

> /versions/:title
Retourne tous les articles comportant le même nom.
Cette requête est notamment utile pour le versionnage, notre base de données dupliquant les articles, elle nous permet de retrouver toutes les versions d'un même article.