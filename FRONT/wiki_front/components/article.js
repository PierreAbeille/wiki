import Link from 'next/link';
import styles from '../styles/components.module.scss';
import ActionButton from './action_button';

export default function Article({article}) {
    return (
        <div className={styles.article}>
            <Link href={`/article/${article._id}`}>
                <a><h2>{article.title}</h2></a>
            </Link>
            <p>{article.content}</p>

            <div className={styles.article__footer}>
                <p>{new Date(article.version).toLocaleDateString()}</p>
                <div className={styles.article__actions}>
                    <ActionButton action={`/article/edit/${article._id}`} icon="/IcRoundEdit.Svg" alt="Edit" styleClass={styles.article__actions__edit} />
                    <ActionButton action={`/api/article/restore/${article._id}`} icon="/IcRoundRestore.Svg" alt="Restore" styleClass={styles.article__actions__restore} />
                    <ActionButton action={`/article/versions/${article.title}`} icon="/IcBaselineAssignment.Svg" alt="Versions" styleClass={styles.article__actions__versions} />
                </div>
            </div>
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