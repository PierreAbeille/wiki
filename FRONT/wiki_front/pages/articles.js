import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from '../components/loader';


export default function Articles({articles}) {
    return (
        <div>
            <h1>Articles</h1>
            <ul>
            {articles.map(article => (
                    <li key={article._id}>
                        <Link href={`/article/${article._id}`}>
                            <a>{article.title}</a>
                        </Link>
                        <Link href={`api/article/delete/${article.title}`}>
                            <a>[X]</a>
                        </Link>
                    </li>
            ))}

            </ul><br/><br/>
            <Link href={`article/creer`}>
                            <a>Créer un article</a>
                        </Link>
        </div>
    )
}

export async function getStaticProps({params}) {
    const res = await fetch(`http://localhost:3000/articles`);
    const articles = await res.json();
    return {
        props: {
            articles
        }
    }
}
