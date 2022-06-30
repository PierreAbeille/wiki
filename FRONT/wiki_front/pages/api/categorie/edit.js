import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    let name = req.body.name
    let id = req.body.id
    axios.put(`http://localhost:3000/categories/${id}`, 
        { 
            name: name
        }
    )
    .then((resp) => {
        res.redirect('/categories')  
    })
    .catch((err) => { console.log(err) });
}