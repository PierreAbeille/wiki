import axios from "axios";
import { useRouter } from 'next/router';

export default function handler(req, res) {
    console.log(req.query);
    axios({
        url: "http://localhost:3000/search/"+req.query.id,
        method: "GET"
    })
    .then((resp) => {
        res.status(200).send(resp.data)  
    })
    .catch((err) => { console.log(err) });
}