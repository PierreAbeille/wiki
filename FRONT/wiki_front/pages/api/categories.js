export default function handler(req, res) {
    res.json({
        categories: [
            {
                id: 1,
                name: 'Category 1'
            },
            {
                id: 2,
                name: 'Category 2'
            },
            {
                id: 3,
                name: 'Category 3'
            }
        ]
    });
}