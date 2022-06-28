import styles from '../../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const Categorie = ({id}) => {
    const router = useRouter();
    [categorie, setCategorie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/categories/${id}`);
            const data = await res.json();
            setCategorie(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>{categorie.title}</h1>
            <p>{categorie.date}</p>
            <p>{categorie.content}</p>
        </div>
    )
}


export default Categorie;