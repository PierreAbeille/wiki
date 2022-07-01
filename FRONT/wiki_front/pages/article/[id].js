import Article from '../../components/article';
import styles from '../../styles/pages.module.scss';
import Chips from '../../components/chips';
import axios from 'axios';

export default function ArticlePage ({article} ) {
    return (
        <div className={styles.article__page}>
            <div className={styles.article_id}>
                <Article article={article[0]} />
            </div>
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