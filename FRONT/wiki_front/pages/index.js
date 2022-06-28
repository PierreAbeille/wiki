import styles from '../styles/pages.module.scss'
import Sidenav from '../components/sidenav';
import Article from '../components/article';

export default function Home() {
  //get the last three articles
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data.articles);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }
  
  return (
    <div className={styles.container}>
      <Sidenav />
      //display the last three articles
      <div className={styles.articles}>
        {articles.map(article => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
