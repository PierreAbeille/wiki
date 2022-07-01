import Link from 'next/link';

export default function Article({article}) {
    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <p>{article.version}</p>

            <Link href={`edit/${article._id}`}> 
                    <a>Editer cet article</a>
            </Link><br/><br/>

            <Link href={`/api/article/restore/${article._id}`}>
                <a>Restaurer cet article</a>
            </Link><br/><br/>

            <Link href={`versions/${article.title}`}>
                <a>Voir les versions de cet article</a>
            </Link>
        </div>

    )
}

export async function getStaticProps({
    params
}) {
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
        params: {
            id: article._id
        }
    }));
    return {
        paths,
        fallback: false
    };
}