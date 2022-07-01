import styles from '../../styles/pages.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Article from '../../components/article';

export default function categorieId ({categorie, result}) {
    return (
        <div>
            <h1>Articles de {categorie.name}</h1>
            <div className={styles.articles__container}>
                {result.map((a,i) =>(
                    <div className={styles.article__item}>
                        <Article article={a}/>
                    </div>
                ))}
            </div>

            <form action="/api/categorie/edit" method="POST">
                Choisir un nouveau nom pour cette catégorie : <input name="name" id="name" type="text"/>
                <input type="text" name="id" id="id" readOnly hidden value={categorie._id}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export async function getStaticProps({params}) {
    const res = await fetch(`http://localhost:3000/categories/${params.id}`)
    const categorie = await res.json()

    const res2 = await fetch(`http://localhost:3000/articlesCategorie/${categorie.name}`)
    const articles = await res2.json()

    var lookup = {};
    var items = articles;
    var result = [];

    for (let i= items.length-1; i >= 0 ; i--){
        let item = items[i];
        var name = item.title;
        
        if (!(name in lookup)) {
            lookup[name] = 1;
            result.push(item);
        }
    }

    return {
        props: {    
            categorie,
            result
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/categories`);
    const data = await res.json();
    const paths = data.map(article => ({
        params: { id: article._id }
    }));
    return { paths, fallback: false };
}