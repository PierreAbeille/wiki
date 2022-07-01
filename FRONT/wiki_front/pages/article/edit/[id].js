import styles from '../../../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditerArticle({article, categories, tags}) {

    //Permet de récupérer l'article et de s'en servir via setState
    let [articles, setArticle] = useState(null);
    if(articles == null) articles = {...article[0]}

    return (
        <div>
            <form action="/api/article/edit" method="POST">
                <input type="text" name="title" id="title" 
                onChange={(evt) =>  {
                    let newArticle = {...article[0]};
                    newArticle.title = evt.currentTarget.value
                    console.log(newArticle.title);
                    setArticle(newArticle);
                }} value={articles.title}/><br/>

                <textarea type="text" name="content" id="content"
                onChange={(evt) =>  {
                    let newArticle = {...article};
                    newArticle.content = evt.currentTarget.value
                    setArticle(newArticle);
                }} value={articles.content}/><br/>

                Changer la catégorie<select name="categorie" id ="categorie"
                onChange={(evt) =>{
                    let newArticle = {...article};
                    for (let index = 0; index < evt.target.options.length; index++) {
                        if (evt.target.options[index].selected) {
                            newArticle.categorie = evt.target.options[index].value
                        }
                    }
                    setArticle(newArticle);}}>
                    <option disabled selected>Choisir</option>
                    {categories.map(c => (
                        <option value={c.name}>{c.name}</option>
                    ))}
                </select><br/>
                Changer les tags<select name="tags" id ="tags" multiple
                onChange={(evt)=>{
                    let selected = []
                    let newArticle = {...article};
                    for (let index = 0; index < evt.currentTarget.options.length; index++) {
                        if (evt.currentTarget.options[index].selected) {
                            selected.push(evt.currentTarget.options[index].value)
                        }
                    }
                    console.log(selected)
                    newArticle.tags = selected
                    setArticle(newArticle);
                    
                }}
                >
                    {tags.map(t => (
                        <option value={t.name}>{t.name}</option>
                    ))}
                </select><br/>


                <input type="text" name="id" readOnly id="id" hidden value={article[0]._id}/>
                Nouvelle version : 
                
                <input type="checkbox" name="version" id="version"
                onChange={(evt) => {
                    let newArticle = {...article};
                    let newVersion = evt.target.checked
                    newArticle.nvVersion = newVersion
                    setArticle(newArticle);
                }}
                /><br/>
                <input type="submit"/>
            </form>
            
        </div>
    )
}

export async function getStaticPaths(id) {
    const res = await fetch('http://localhost:3000/articles')
    const posts = await res.json()
  
    const paths = posts.map((post) => ({
      params: { id: post._id },
    }))
    return { paths, fallback: false }
  }

export async function getStaticProps({params}) {

    const res = await fetch(`http://localhost:3000/articles/${params.id}`);
    const article = await res.json();

    const cats = await fetch(`http://localhost:3000/categories`);
    const categories = await cats.json();

    const t = await fetch(`http://localhost:3000/tags`);
    const tags = await t.json();

    return {
        props: {
            article,
            categories,
            tags
        }
    }
}