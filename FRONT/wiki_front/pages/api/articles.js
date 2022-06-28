export default function handler(req, res) {
    //return a fake api response for the articles page
    res.json({
        articles: [
            {
                id: 1,
                title: 'Article 1',
                date: '2020-01-01'
            },
            {
                id: 2,
                title: 'Article 2',
                date: '2020-01-02'
            },
            {
                id: 3,
                title: 'Article 3',
                date: '2020-01-03'
            }
        ]
    });
}