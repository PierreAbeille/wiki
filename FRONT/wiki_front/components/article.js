// Make a component for the article. It must display the title, the content and the tags.
// //
// // The title must be the title of the article.
// //
// // The content must be the content of the article.
// //
// // The tags must be a list of tags.
// //
import styles from '../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const Article = ({id}) => {
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/articles/${id}`);
            const data = await res.json();
            setArticle(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.date}</p>
            <p>{article.content}</p>
            <ul>
                {article.tags.map(tag => (
                    <li key={tag.id}>{tag.title}</li>
                ))}
            </ul>
        </div>
    )
}


export default Article;