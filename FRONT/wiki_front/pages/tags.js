import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const Categories = () => {
    const router = useRouter();
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/tags`);
            const data = await res.json();
            setTags(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>Tags</h1>
            <ul>
                {tags.map(tag => (
                    <li key={tag._id}>
                        <Link href={`/tag/${tag._id}`}>
                            <a>{tag.name}</a>
                        </Link>
                        <Link href={`api/tag/delete/${tag._id}`}>
                            <a>[X]</a>
                        </Link>
                        <Link href={`tag/creer`}>
                            <a>Créer un tag</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Categories;
