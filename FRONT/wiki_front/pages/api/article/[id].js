import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    axios({
        url: `http://localhost:3000/articles/${req.query.id}`,
        method: "GET"
    })
    .then((resp) => {
        res.status(200).send(resp.data[0])  
    })
    .catch((err) => { console.log(err) });
}