import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Chips from '../components/chips';
import styles from '../styles/pages.module.scss';

const Tags = () => {
    const router = useRouter();
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/indexes/tags`);
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
            <h2>Tags</h2>
            <div className="styles.tags">
                {tags.map(tag => (
                    <div key={tag._id}>
                        <Chips tag={tag} deleteTag />
                    </div>
                ))}
            </div>
            <Link href={`tag/creer`}>
                            <a>Créer un tag</a>
            </Link>
        </div>
    )
}


export default Tags;
