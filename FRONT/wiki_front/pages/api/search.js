import axios from "axios";

export default function handler(req, res) {
    axios({
        url: "http://localhost:3000/search/"+req.query.search,
        method: "GET"
    })
    .then((resp) => {
        res.send(200).sent(resp.data)
    })
    .catch((err) => { console.log(err) });
}