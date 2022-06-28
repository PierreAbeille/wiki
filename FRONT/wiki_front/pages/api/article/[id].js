import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    axios({
        url: `http://localhost:3000/articles/${req.query.id}`,
        method: "GET"
    })
    .then((resp) => {
        // console.log(resp.data[0]);
        res.status(200).send(resp.data[0])  
    })
    .catch((err) => { console.log(err) });
}