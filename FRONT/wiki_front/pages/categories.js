import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/pages.module.scss';
import ActionButton from '../components/action_button';

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
        <div className={styles.pages__list}>
            <h1>Catégories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>
                        <Link href={`/categorie/${category._id}`}>
                            <a>{category.name}</a>
                        </Link>
                        <ActionButton action={`api/categorie/delete/${category._id}`} icon={'/IcBaselineCancel.svg'} alt={'Delete'} styleClass={styles.delete_button}/>                   
                    </li>
                ))}
            </ul>
            <div className={styles.add_button}>
                <ActionButton action={'categorie/creer'} icon={'/IcRoundPlus.svg'} alt={'Create'} text={'Créer une catégorie'} styleClass={styles.add_icon}/>
            </div>
        </div>
    )
}


export default Categories;
