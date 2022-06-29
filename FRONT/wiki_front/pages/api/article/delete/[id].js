import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    axios({
        url: `http://localhost:3000/articles/${req.query.id}`,
        method: "DELETE"
    })
    .then((resp) => {
        res.redirect('/articles');
    })
    .catch((err) => { console.log(err) });
}