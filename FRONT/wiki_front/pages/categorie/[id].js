import styles from '../../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function categorieId ({categorie, result}) {
    return (
        <div>
            <h1>Articles de {categorie.name}</h1>

            {result.map((a,i) =>(
                <div>
                <Link href={`/article/${a._id}`}>
                    <a>{a.title}</a>
                </Link>
                <br/></div>
                    
            ))}

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