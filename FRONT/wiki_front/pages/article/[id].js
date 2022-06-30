import styles from '../../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Make a ArticlePage component that displays an Article component.
export default function ArticlePage ({article}) {
    return (
        <div>
            <h1>{article[0].title}</h1>
            <p>{article[0].content}</p>
            <p>{article[0].version}</p>
            
            <Link href={`edit/${article[0]._id}`}> 
                <a>Editer cet article</a>
            </Link>

            <br/><br/>
            <Link href={`versions/${article[0].title}`}> 
                <a>Voir les versions de cet article</a>
            </Link>
        </div>
    )
}


export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/articles`);
    const data = await res.json();
    const paths = data.map(article => ({
        params: { id: article._id }
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({params}) {
    const res = await fetch(`http://localhost:3000/articles/${params.id}`);
    const article = await res.json();

    return {
        props: {    
            article
        }
    }
}

