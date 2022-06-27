const express = require('express');
const app = express();
const port = 3000;




app.get('/', (req, res)=>{
    res.send('tetutust')
})

app.get('/articles', (req,res)=>{

})

app.get('/articles/create', (req,res)=>{

})
    
app.get('/articles/edit', (req,res)=>{

})

app.get('/categories', (req,res)=>{

})

app.get('/search', (req,res)=>{

})

app.get('/tags', (req,res)=>{

})

app.get('/tags/create', (req,res)=>{

})
// app.get('/chemin1', (req, res)=>{
//     res.send('such wow')
// })

// app.get('/chemin2', (req, res)=>{
//     res.json({
//         prenom: "toto",
//         nom: "tutu",
//         age: "358"
//     })
// })

// app.get('/chemin3/:id', (req,res)=>{
    
//     if(req.params.id ==0){
//         res.status(500).send('erreur')
//     }else{
//         res.json({
//             id : req.params.id
//         })
//     } 
// })

// app.use(express.json())

// app.post('/chemin4', (req,res)=>{
    
//     console.log(req.body)
//     res.json(req.body)
// })

// app.use(express.static(__dirname + '/public'))


app.listen(port, ()=>{
    console.log('listening on 3000');
});