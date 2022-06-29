import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    axios({
        url: `http://localhost:3000/tags/${req.query.id}`,
        method: "DELETE"
    })
    .then((resp) => {
        res.redirect('/tags');
    })
    .catch((err) => { console.log(err) });
}