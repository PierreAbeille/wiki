const express = require('express');
let MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
app.use(express.json())

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });

MongoClient.connect('mongodb+srv://mongo:Mongo31@cluster0.cetno.mongodb.net/DBTest?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err;
    else {

        console.log("Connecté à la base de données");
        let db = client.db('DBTest');
        let ObjectId = require('mongodb').ObjectId;
        let articles = db.collection('wiki');
        let tags = db.collection('tags');
        let categories = db.collection('categories');

        app.get('/', (req, res)=>{
            res.send('Bienvenue')
        })

        // Liens ARTICLES
        app.get('/articles', (req, res, next)=>{
            articles.find({}).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).send(result)
            })
        })
        app.delete('/articles/:id', (req,res)=>{
            articles.deleteOne({ _id: new ObjectId(req.params.id)}, function (err, result){
                if (err) throw err;
                res.json(result)
            })
        })
        app.get('/articles/:id', (req,res)=>{
            articles.find({ _id: new ObjectId(req.params.id) }).toArray(function(err, result) {
                if (err) throw err;
                res.status(200).send(result)
            })
        })

        app.post('/articles', (req,res)=>{
            articles.insertOne({ 
                title: req.body.title, 
                content: req.body.content, 
                version: Date.now(),
                tags: req.body.tags 
            }, 
                function (err, result) {
                    if (err) throw err;
                    res.json(result);
            })
        })

        app.put('/articles/:id', (req,res)=>{
            let article = articles.findOne({ _id: req.params.id }, function (err, result) {
                if (err) throw err;
            })
            articles.insertOne({
                    title: req.body.title,
                    content: req.body.content,
                    version: Date.now(),
                    tags: req.body.tags
            }, function (err, result) {
                if (err) throw err;
                res.json({
                    status: "200",
                    data: result
                });
            });
        })

        // LIENS DES TAGS
        app.delete('/tags/:id', (req,res)=>{
            tags.deleteOne({ _id: new ObjectId(req.params.id)}, function (err, result){
                if (err) throw err;
                res.json(result)
            })
        })
        app.post('/tags', (req,res)=>{
            tags.insertOne({ name: req.body.name }, 
                function (err, result) {
                    if (err) throw err;
                    res.json(result);
            })
        })
        app.put('/tags/:id', (req,res)=>{
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
        app.get('/tags', (req, res, next)=>{
            tags.find({}).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).send(result)
            })
        })
        app.get('/tags/:id', (req,res)=>{
            tags.findOne({ _id: new ObjectId(req.params.id) }, function (err, result) {
                if (err) throw err;
                res.status(200).send(result)
            })
        })



        // Liens à part
        app.get('/categories', (req,res)=>{
            categories.find({}).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).send(result)
            })
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
                res.status(200).send(result)
            })
        })
        
        app.get('/search', (req,res, next)=>{

            let parTitre = articles.find({ $or: [ { tags: req.body.input } , { title: req.body.input } ] }).toArray(function(err, result) {
                if (err) throw err;
                res.status(200).send(result)
            })
            
        })

        // Initialisation de la base de données
        app.get('/api/db/init', (req,res)=>{

            var creerCollections = ["categories", "tags", "wiki"];
            creerCollections.forEach(function(collectionName) {db.createCollection(collectionName)})

            categories.insertMany(
                [{name: "cuisine"},{name: "musique"},{name: "spatial"}]
            )

            tags.insertMany(
                [{name: "tag1"},{name: "tag2"},{name: "tag3"}]
            )
           
            articles.insertOne({
                title: "article1",
                content: "Bojoure c'est canare",
                version: new Date(),
                tags: ["tag1", "tag2"]

            }, function (err, result) { if (err) throw err; })

            res.send('Bdd initialisée')
        })

        app.listen(port, ()=>{
            console.log('listening on 3000');
        });
    }
})