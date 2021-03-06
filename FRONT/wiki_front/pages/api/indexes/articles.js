import axios from "axios";

export default function handler(req, res) {
    axios({
        url: "http://localhost:3000/articles",
        method: "GET"
    })
    .then((resp) => {
        var lookup = {};
        var items = resp.data;
        var result = [];

        for (let i= items.length-1; i >= 0 ; i--){
            let item = items[i];
            var name = item.title;
            
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(item);
            }
        }
        res.status(200).send(result)  
    })
    .catch((err) => { console.log(err) });
}