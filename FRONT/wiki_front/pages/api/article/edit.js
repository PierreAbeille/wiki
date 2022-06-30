import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    // console.log(req.body);
    let id = req.body.id
    axios.put(`http://localhost:3000/articles/${id}`, 
        { 
            title: req.body.title,
            content: req.body.content,
            date: new Date(),
            tags: req.body.tags,
            categorie: req.body.categorie,
            nvVersion: req.body.version
        }
    )
    .then(() => {
        res.redirect('/articles')  
    })
    .catch((err) => { console.log(err) });
}