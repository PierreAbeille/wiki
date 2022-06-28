import styles from '../styles/pages.module.scss'
import Sidenav from '../components/sidenav';
import Article from '../components/article';
import Loader from '../components/loader';
import { useState, useEffect } from 'react';

export default function Home() {
  //get the last three articles
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/articles');
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
    <div className={styles.container}>
      <Sidenav />
      <div className={styles.articles}>
        {articles.map(article => (
          <Article id={article._id}/>
        ))}
      </div>
    </div>
  )
}
