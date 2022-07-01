import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    console.log(req);
    axios({
        url: `http://localhost:3000/article/restore/${req.query.id}`,
        method: "PUT"
    })
    .then((resp) => {
        res.redirect('/articles')  
    })
    .catch((err) => { console.log(err) });
}