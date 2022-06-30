import Article from '../../components/article';

export default function ArticlePage ({article}) {
    return (
        <div>
            <Article article={article[0]} />
        </div>
    )
}

export async function getStaticProps({params}) {
    const res = await fetch(`http://localhost:3000/articles/${params.id}`)
    const article = await res.json()
    return {
        props: {    
            article
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/articles`);
    const data = await res.json();
    const paths = data.map(article => ({
        params: { id: article._id }
    }));
    return { paths, fallback: false };
}