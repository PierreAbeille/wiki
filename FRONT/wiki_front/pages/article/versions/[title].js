import Link from 'next/link';

export default function VersionsArticle({article}) {

    return (
        <div>
        {article.map((a,i) =>(
            <div>
            <Link href={`truc`}>
                <a>version du {a.version}</a>
            </Link>
            <br/><br/></div>
        ))}
        
        </div>
    )
}

export async function getStaticPaths(id) {
    const res = await fetch('http://localhost:3000/articles')
    const posts = await res.json()
  
    const paths = posts.map((post) => ({
      params: { title: post.title },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({params}) {
    const res = await fetch(`http://localhost:3000/versions/${params.title}`);
    const article = await res.json();
    return {
        props: {
            article
        }
    }
}