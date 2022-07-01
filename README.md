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

## Structure de la base de données ##

La base de données contient 3 collections, une "wiki", une "tags" et une "categories"
Les tags et les catégories sont très simples, les objets ne sont composés que d'un seul attribut name.

categories :

> {
>     _id: "ObjectId",
>     name: "catégorie 1"
> }

tags :

> {
>     _id: "ObjectId",
>     name: "tag 1"
> }

Les articles (forcément) sont plus complèxes :

> {
>     "_id":{"$oid":"62bee1ea9f52c5c94048b394"},
>     "title":"article numéro 2",
>     "content":"Never gonna give you up. Never gonna let you down",
>     "version": 1656676842109,
>     "tags":["tag2","Rick","Rolled"],
>     "categorie":"musique"
> }

Ils ont : un titre, un contenu, une version, et des tags et catégories.
Les tags et catégories sont récupérés dans la base de données, un article a une et une seule catégorie, et peut avoir autant de tags qu'il en existe.
Le titre et le contenu sont renseignés dans des formulaires lors de la création ou de la modification d'un article.

Pour les versions nous avons décidé de les gérer par timestamp. Chaque fois qu'un article est créé, modifié ou qu'une nouvelle version est créée, l'entrée en DB est gérée par un *Date.now()*.

Sur la page d'accueil, et des articles, l'idée était d'afficher seulement la dernière version d'un article. Pour gérer ça, nous avons décidé de parcourir la base de données depuis la fin, et de garder seulement la première occurence trouvée d'un même article. 
MongoDB parcourant les items dans l'ordre, et ajoutant toujours les entrées à la fin, ça ne pose aucun problème de trier comme ça.


## Contrat d'interface ##
> /
Index contenant tous les articles, catégories et tags

> /articles
Retourne une liste de tous les articles avec possibilité de les supprimer, modifier, consulter les anciennes versions, restaurer une ancienne version, et créer un nouvel article

> /article/[id]
Retourne un article et les options qui lui sont associés

> /article/creer
Retourne un formulaire de création d'article

> /article/edit/[id]
Retourne un formulaire de modification d'article

> /article/versions/[title]
Retourne une liste des versions (datés) d'un article

> /categories
Retourne une liste de toutes les catégories avec possibilité de les supprimer, modifier ou d'en ajouter

> /categorie/[id]
Retourne tout les articles associés à une catégorie, avec possibilité de modifier la catégorie

> /categories/creer
Retourne un formulaire de création de catégorie

> /tags
Retourne une liste de tous les tags avec possibilité de les supprimer, modifier ou d'en ajouter (directement intégré dans la sidenav)

> /tag/[id]
Retourne un formulaire de modification de tag

> /tag/creer
Retourne un formulaire de création de tag (n'est plus utilisé, car directement intégré à la sidenav de l'index)

> /search
Retourne une liste de résultats de recherche
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