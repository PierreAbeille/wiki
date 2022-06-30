import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    let title = req.body.title
    let content = req.body.content
    let categorie = req.body.categorie
    let tags = req.body.tags

    axios.post(`http://localhost:3000/articles`, 
        { 
            title: title,
            content: content,
            date: new Date(),
            categorie: categorie,
            tags: tags
        }
    )
    .then(() => {
        res.redirect('/articles')  
    })
    .catch((err) => { console.log(err) });
}