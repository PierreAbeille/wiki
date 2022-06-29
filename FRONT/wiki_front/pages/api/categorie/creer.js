import axios from "axios";
import { useRouter } from 'next/router';

export default function handler(req, res) {
    let name = req.body.name

    axios.post(`http://localhost:3000/categories`, 
        { 
            name: name
        }
    )
    .then((resp) => {
        res.redirect('/categories')  
    })
    .catch((err) => { console.log(err) });
}