import axios from "axios";

export default function handler(req, res) {
    axios({
        url: "http://localhost:3000/categories",
        method: "GET"
    })
    .then((resp) => {
        res.status(200).send(resp.data)   
    })
    .catch((err) => { console.log(err) });
}