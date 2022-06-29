import styles from '../../../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const EditArticle = () => {
    const router = useRouter();
    const { id } = router.query
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/article/${id}`);
            const data = await res.json();
            setArticle(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading... {id}</p>
    }

    return (
        <div>
            <form action="../../api/article/edit" method="POST">
                <input type="text" name="title" id="title" 
                onChange={(evt) =>  {
                    let newArticle = {...article};
                    newArticle.title = evt.currentTarget.value
                    setArticle(newArticle);
                }} value={article.title}/>

                <input type="text" name="content" id="content"
                onChange={(evt) =>  {
                    let newArticle = {...article};
                    newArticle.content = evt.currentTarget.value
                    setArticle(newArticle);
                }} value={article.content}/>
                <input type="text" name="id" readOnly id="id" hidden value={article._id}/>
                {/* <input type="text" name="" id="" value={}/> */}
                <input type="submit"/>
            </form>
            
        </div>
    )
}

export default EditArticle