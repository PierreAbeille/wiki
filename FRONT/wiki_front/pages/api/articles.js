import axios from "axios";

export default function handler(req, res) {
    axios({
        url: "http://localhost:3000/articles",
        method: "GET"
    })
    .then((resp) => {
        // console.log(resp.data);

        var lookup = {};
        var items = resp.data;
        var result = [];

        for (var item, i = 0; item = items[i++];) {
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