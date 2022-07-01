const express = require('express');
let MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
app.use(express.json())

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });

MongoClient.connect('mongodb+srv://mongo:Mongo31@cluster0.cetno.mongodb.net/wiki?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err;
    else {
        console.log("Connecté à la base de données");
        let db = client.db('Wiki');
        let ObjectId = require('mongodb').ObjectId;
        let articles = db.collection('articles');
        let tags = db.collection('tags');
        let categories = db.collection('categories');

        // Liens ARTICLES
        app.get('/articles', (req, res, next)=>{
            articles.find({}).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).send(result)
            })
        })

        app.post('/articles', (req,res)=>{
            articles.insertOne({ 
                title: req.body.title, 
                content: req.body.content, 
                version: Date.now(),
                tags: req.body.tags,
                categorie: req.body.categorie
            }, 
                function (err, result) {
                    if (err) throw err;
                    res.json(result);
            })
        })

        app.delete('/articles/:id', (req,res)=>{
            articles.deleteMany({ title: req.params.id}, function (err, result){
                if (err) throw err;
                res.status(200).json(result)
            })
        })
        app.get('/articles/:id', (req,res)=>{
            articles.find({ _id: new ObjectId(req.params.id) }).toArray(function(err, result) {
                if (err) throw err;
                res.status(200).json(result)
            })
        })
        app.get('/articlesCategorie/:id', (req,res)=>{
            articles.find({ categorie: req.params.id }).toArray(function(err, result) {
                if (err) throw err;
                res.status(200).json(result)
            })
        })

        app.get('/versions/:title', (req,res)=>{
            articles.find({ title: req.params.title }).toArray(function(err, result) {
                if (err) throw err;
                res.status(200).json(result)
            })
        })

        app.put('/article/restore/:id', (req,res) => {
            articles.find({ _id: new ObjectId(req.params.id)}).toArray(function(err, result) {
                if (err) throw err;

                console.log(result);

                articles.insertOne({ 
                    title: result[0].title, 
                    content: result[0].content, 
                    version: Date.now(),
                    tags: result[0].tags,
                    categorie: result[0].categorie
                }, 
                function (err, result) {
                    if (err) throw err;
                })

                articles.deleteOne({ _id: new ObjectId(req.params.id)}, function (err, result){
                    if (err) throw err;
                    
                })
                res.status(200).json(result)
            })
            
            
        })
        
        app.put('/articles/:id', (req,res)=>{

            // Si on veut créer une nouvelle version
            if(req.body.nvVersion){
                let article = articles.findOne({ _id: req.params.id }, function (err, result) {
                    if (err) throw err;
                })
                articles.insertOne({
                        title: req.body.title,
                        content: req.body.content,
                        version: Date.now(),
                        categorie: req.body.categorie,
                        tags: req.body.tags,
                }, function (err, result) {
                    if (err) throw err;
                    res.json({
                        status: "200",
                        data: result
                    });
                });

            //Pas de nouvelle version
            //Si on veut juste corriger une faute de frappz, par exemple
            }else{
                articles.updateOne({
                    _id: new ObjectId(req.params.id) 
                }, {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        categorie: req.body.categorie,
                        tags: req.body.tags
                    }
                }, function (err, result) {
                    if (err) throw err;
                    res.json({
                        status: "200",
                        data: result
                    });
                });
            }

            
        })



        // LIENS DES TAGS
        app.delete('/tags/:id', (req,res)=>{
            tags.deleteOne({ _id: new ObjectId(req.params.id)}, function (err, result){
                if (err) throw err;
                res.json(result)
            })
        })
        app.put('/tags/:id', (req,res)=>{
            // Cette longue méthode remplace le nom du tag
            // Mais aussi les articles en changeant le nom du tag dans l'article
            tags.findOne({ _id: new ObjectId(req.params.id) }, function (err, result) {
                if (err) throw err;

                // D'abord on trouve les articles avec le tag à modifier
                articles.find({ tags: result.name }).toArray(function(err1, result1) {
                    if (err1) throw err1;
                    result1.forEach(r =>{
                        //Si r.tags est un tableau (donc a au moins 2 tags)
                        if(Array.isArray(r.tags)){
                            //Enlever un tag
                            r.tags.splice(r.tags[r.tags.indexOf(result.name)], 1);
                            //Ajouter le nouveau tag
                            r.tags.push(req.body.name)
                        }
                        //Si ce n'est pas un tableau, il suffit de remplacer la valeur
                        else{
                            r.tags = req.body.name
                        }
                        
                        //Mettre à jour l'article
                        articles.updateOne({
                            _id: new ObjectId(r._id)
                        },{
                            $set: {
                                tags: r.tags
                            }
                        }, function (err2, result2){
                            if (err2) throw err2;
                        })    
                    })
                })
            })
            tags.updateOne({
                _id: new ObjectId(req.params.id) 
            }, {
                $set: {
                    name: req.body.name
                }
            }, function (err, result) {
                if (err) throw err;
                res.json({
                    status: "200",
                    data: result
                });
            });
        })
        app.get('/tags/:id', (req,res)=>{
            tags.findOne({ _id: new ObjectId(req.params.id) }, function (err, result) {
                if (err) throw err;
                res.status(200).json(result)
            })
        })

        app.post('/tags', (req,res)=>{
            tags.insertOne({ name: req.body.name }, 
                function (err, result) {
                    if (err) throw err;
                    res.json(result);
            })
        })
        
        app.get('/tags', (req, res, next)=>{
            tags.find({}).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).json(result)
            })
        })
        



        // Liens catégories
        app.get('/categories', (req,res)=>{
            categories.find({}).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).json(result)
            })
        })
        app.post('/categories', (req,res)=>{
            categories.insertOne({ name: req.body.name }, 
                function (err, result) {
                    if (err) throw err;
                    res.json(result);
            })
        })
        app.put('/categories/:id', (req,res)=>{

            //Trouver l'ancien nom de la catégorie, et mettre à jour les articles avec le nouveau nom
            categories.findOne({ _id: new ObjectId(req.params.id) }, function (err, result) {
                if (err) throw err;
                articles.updateMany({
                    categorie: result.name
                },{
                    $set: {
                        categorie: req.body.name
                    }
                }, function (err2, result2){
                    if (err2) throw err2;
                })
            })

            //Changer le nom de la catégorie
            categories.updateOne({
                _id: new ObjectId(req.params.id) 
            }, {
                $set: {
                    name: req.body.name
                }
            }, function (err, result) {
                if (err) throw err;
                res.json({
                    status: "200",
                    data: result
                });
            });
            
        })
        app.delete('/categories/:id', (req,res)=>{
            categories.deleteOne({ _id: new ObjectId(req.params.id)}, function (err, result){
                if (err) throw err;
                res.json(result)
            })
        })
        app.get('/categories/:id', (req,res)=>{
            categories.findOne({ _id: new ObjectId(req.params.id) }, function (err, result) {
                if (err) throw err;
                res.status(200).json(result)
            })
        })
        


        //Recherche
        app.get('/search/:id', (req,res)=>{
            let parTitre = articles.find({ $or: [ { tags: req.params.id } , { title: req.params.id } ] }).toArray(function(err, result) {
                if (err) throw err;
                res.status(200).json(result)
            })
            
        })

        // Initialisation de la base de données
        app.get('/api/db/init', (req,res)=>{


            var creerCollections = ["categories", "tags", "articles"];

            creerCollections.forEach(function(collectionName) {db.collection(collectionName).drop()})

            creerCollections.forEach(function(collectionName) {db.createCollection(collectionName)})

            categories.insertMany(
                [{name: "cuisine"},{name: "musique"},{name: "spatial"}]
            )

            tags.insertMany(
                [{name: "tag1"},{name: "tag2"},{name: "tag3"}]
            )
           
            articles.insertOne({
                title: "article numéro 1",
                content: "Bienvenue dans notre blog dédié à absolument rien",
                categorie: "introduction",
                version: Date.now(),
                tags: ["tag1", "tag2"]

            }, function (err, result) { if (err) throw err; })

            articles.insertOne({
                title: "article numéro 2",
                content: "Never gonna give you up. Never gonna let you down",
                categorie: "musique",
                version: new Date(),
                tag: ["tag1", "tag3"]

            }, function (err, result) { if (err) throw err; })

            res.send('Bdd initialisée')
        })

        app.listen(port, ()=>{
            console.log('listening on port '+port);
        });
    }
})