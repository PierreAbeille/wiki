import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Chips from '../components/chips';
import styles from '../styles/pages.module.scss';
import axios from 'axios';

export default function Tags (props) {
    const router = useRouter();

    const refreshTags = () => {
        router.replace(router.asPath)
    }

    return (
        <div>
            <h2>Tags</h2>
            <div className={styles.tags}>
                {props.tags.map(tag => (
                    <Chips key={tag._id} tag={tag} deleteTag={true} />
                ))}
            </div>
            <form action="../api/tag/creer" method="POST">
                <input type="text" name="name" id="name" placeholder='Créer un tag'/>
                <input type="image" src="/IcRoundAddCircle.Svg" alt="Submit" />
            </form>
        </div>
    )
}


// Si on laisse la page de tags il faut laisser la fonction là
export async function getStaticProps({params}) {
    const res = await fetch(`http://localhost:3000/tags`)
    const tags = await res.json()
  
    return {
        props: {
            tags
        }
    }
}

async function handleSubmit() {
    const res = await axios.post('/api/tag/creer', {
        name: document.getElementById('name').value
    });
    if (res.status < 300) {
        refreshTags();
    }
}