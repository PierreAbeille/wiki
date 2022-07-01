import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from '../components/loader';


export default function Articles({result, categories, tags}) {
    return (
        <div>
            <h1>Articles</h1>
            <ul>
            {result.map( (res, i) => (
                <li key={res._id}>
                    <Link href={`/article/${res._id}`}>
                        <a>{res.title}</a>
                    </Link>
                    <Link href={`api/article/delete/${res.title}`}>
                        <a>[X]</a>
                    </Link>
                </li>
            ))}

            </ul>
            <Link href={`article/creer`}>
                        <a>Créer un article</a>
                    </Link>
        </div>
    )
}

export async function getStaticProps({params}) {
    const arts = await fetch(`http://localhost:3000/articles`);
    const articles = await arts.json();

    const cats = await fetch(`http://localhost:3000/categories`);
    const categories = await cats.json();

    const t = await fetch(`http://localhost:3000/tags`);
    const tags = await t.json();

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
            result,
            categories,
            tags
        }
    }
}
