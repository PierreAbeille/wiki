import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    let title = req.body.title
    let content = req.body.content
    axios.post(`http://localhost:3000/articles`, 
        { 
            title: title,
            content: content,
            date: new Date(),
            tags: ["tag1","tag3"]
        }
    )
    .then(() => {
        res.redirect('/articles')  
    })
    .catch((err) => { console.log(err) });
}