import axios from "axios";
import { useRouter } from 'next/router';


export default function handler(req, res) {
    let name = req.body.name

    axios.post(`http://localhost:3000/tags`, 
        { 
            name: name
        }
    )
    .then((resp) => {
        res.redirect('/')  
    })
    .catch((err) => { console.log(err) });
}