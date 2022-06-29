import styles from '../../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

//Make a ArticlePage component that displays an Article component.
export default function ArticlePage ({article}) {
    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <p>{article.version}</p>
            
            <Link href={`edit/${article._id}`}> 
                <a>Editer cet article</a>
            </Link>
        </div>
    )
}

export async function getStaticProps({params}) {
    const article = await fetch(`http://localhost:3000/articles/${params.id}`).then(res => res.json());
    return {
        props: {    
            article
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/articles`);
    const data = await res.json();
    const paths = data.map(article => ({
        params: { id: article._id }
    }));
    return { paths, fallback: false };
}