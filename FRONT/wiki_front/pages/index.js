import styles from '../styles/pages.module.scss'
import Sidenav from '../components/sidenav';
import Article from '../components/article';
import Loader from '../components/loader';
import { useState, useEffect } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/indexes/articles');
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader />
  }
  
  return (
    <div className={styles.home}>
      <div className={styles.articles__container}>
        {articles.map(article_item => (
          <div className={styles.article__item}>
            <Article article={article_item}/>
          </div>
        ))}
      </div>
      <div className={styles.sidenav}>
        <Sidenav />
      </div>
    </div>
  )
}
