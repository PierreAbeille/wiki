const express = require('express');
let MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

MongoClient.connect('mongodb+srv://mongo:Mongo31@cluster0.cetno.mongodb.net/Wiki?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err;
    else {
        console.log("Connecté à la base de données");

        let db = client.db('Wiki');

        let ObjectId = require('mongodb').ObjectId;
        let collection = db.collection('wiki');


        app.listen(port, ()=>{
            console.log('listening on 3000');
        });
    }
})



app.get('/', (req, res)=>{
    res.send('tetutust')
})

app.get('/api/db/setup', (req,res)=>{
    
})

app.get('/articles', (req,res)=>{

})

app.delete('/articles/{id}', (req,res)=>{

})

app.get('/articles/{id}', (req,res)=>{

})

app.put('/articles/{id}', (req,res)=>{

})
    
app.get('/articles/{id}/edit', (req,res)=>{

})

app.get('/articles/{id}/versions', (req,res)=>{

})

app.get('/articles/create', (req,res)=>{

})

app.get('/categories', (req,res)=>{

})

app.get('/search', (req,res)=>{

})

app.get('/tags', (req,res)=>{

})

app.get('/tags/create', (req,res)=>{

})