import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const Categories = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/indexes/categories`);
            const data = await res.json();
            setCategories(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    

    if (loading) {
        return <p>Loading...</p>
    }

    return (    
        <div>
            <h1>Catégories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>
                        <Link href={`/categorie/${category._id}`}>
                            <a>{category.name}</a>
                        </Link>
                        <Link href={`api/categorie/delete/${category._id}`}>
                            <a>[X]</a>
                        </Link>
                        <Link href={`categorie/creer`}>
                            <a>Créer une catégorie</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Categories;
