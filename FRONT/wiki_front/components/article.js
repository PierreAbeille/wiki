import Link from 'next/link';
import styles from '../styles/components.module.scss';

export default function Article({article}) {
    return (
        <div className={styles.article}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>{new Date(article.version).toLocaleDateString()}</p>

            <Link href={`edit/${article._id}`}> 
                    <a>Editer cet article</a>
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