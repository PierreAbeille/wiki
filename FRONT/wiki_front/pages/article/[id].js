import styles from '../../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const Article = () => {
    const router = useRouter();
    const { id } = router.query
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/article/${id}`);
            const data = await res.json();
            setArticle(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading... {id}</p>
    }

    return (
        <div>
            
            
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <p>{article.version}</p>
            
            <Link href={`edit/${article._id}`}>
                <a>Editer cet article</a>
            </Link>
        </div>
    )
}


export default Article;