import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from '../components/loader';


const Articles = () => {
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/articles`);
            const data = await res.json();
            setArticles(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>Articles</h1>
            <ul>
            {articles.map(article => (
                    <li key={article._id}>
                        <Link href={`/article/${article._id}`}>
                            <a>{article.title}</a>
                        </Link>
                        <Link href={`api/article/delete/${article._id}`}>
                            <a>[X]</a>
                        </Link>
                    </li>
            ))}

            </ul>
        </div>
    )
}


export default Articles;
