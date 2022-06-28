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
            const res = await fetch(`/api/categories`);
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
                {categories.categories.map(category => (
                    <li key={category.id}>
                        <Link href={`/categories/${category.id}`}>
                            <a>{category.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Categories;