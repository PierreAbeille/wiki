import styles from '../../styles/pages.module.scss';

export default function CreerArticle({categories, tags}) {

    return (
        <form action="/api/article/creer" method="POST" className={styles.page_form}>
            <div>
                Titre : <input type="text" name="title" id="title"/>
            </div>
            <div>
                Contenu : <textarea name="content" id="content"/>
            </div>
            <div>
                Ajouter une catégorie<select name="categorie" id ="categorie">
                    {categories.map(c => (
                        <option value={c.name}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div>
                Ajouter un tag<select name="tags" id ="tags" multiple>
                    {tags.map(t => (
                        <option value={t.name}>{t.name}</option>
                    ))}
                </select>
            </div>
                <input type="submit"/>
        </form>
    )
}

export async function getStaticProps({params}) {
    const cats = await fetch(`http://localhost:3000/categories`);
    const categories = await cats.json();

    const t = await fetch(`http://localhost:3000/tags`);
    const tags = await t.json();

    return {
        props: {
            categories,
            tags
        }
    }
}
