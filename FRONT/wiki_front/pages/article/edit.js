import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    console.log(req);
    // let title = req.body.title
    // let content = req.body.content
    // axios.post(`http://localhost:3000/articles/${id}`, 
    //     { 
    //         title: title,
    //         content: content,
    //         date: new Date(),
    //         tags: ["tag1","tag8"]
    //     },{

    //     }
    // )
    // .then((resp) => {
    //     res.redirect('/articles')  
    // })
    // .catch((err) => { console.log(err) });
}