import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    axios({
        url: `http://localhost:3000/categories/${req.query.id}`,
        method: "DELETE"
    })
    .then((resp) => {
        res.redirect('/categories');
    })
    .catch((err) => { console.log(err) });
}