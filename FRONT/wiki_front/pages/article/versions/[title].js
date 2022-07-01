import Link from 'next/link';
import styles from '../../../styles/pages.module.scss';

export default function VersionsArticle({article}) {

    return (
        <div className={styles.content_list}>
        {article.slice(0).reverse().map((a,i) =>(
            <div className={styles.content_list_item} key={i}>
                <Link href={`/article/${a._id}`}>
                    <a>Version du {new Date(a.version).toLocaleDateString()}</a>
                </Link>
            </div>
        ))}
        
        </div>
    )
}

export async function getStaticPaths(id) {
    const res = await fetch('http://localhost:3000/articles')
    const posts = await res.json()
  
    const paths = posts.map((post) => ({
      params: { title: post.title },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({params}) {
    const res = await fetch(`http://localhost:3000/versions/${params.title}`);
    const article = await res.json();
    return {
        props: {
            article
        }
    }
}