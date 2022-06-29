import styles from '../../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const Categorie = () => {
    const router = useRouter();
    const { id } = router.query
    const [tag, setTag] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/tag/${id}`);
            const data = await res.json();
            setTag(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>{tag.name}</h1>
        </div>
    )
}


export default Categorie;