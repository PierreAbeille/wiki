import styles from '/styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Search = () => {
    const router = useRouter();
    const { id, query } = router.query
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if(!router.query) return;
        const fetchData = async () => {
            const res = await fetch(`/api/search/${router.query.search}`);
            const data = await res.json();
            setSearch(data);
            setLoading(false);
        }
        fetchData();
    }, [router.query]);

    if (loading) {
        return  <div>Loading...</div>
    }

    console.log(search[0]);

    return (
        <div>
            <ul>
                {search.map(s => (
                    <li>
                        {s.title}<br/>
                        {s.content}<br/>   
                        {s.version}<br/>
                        {s.tag}<br/>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Search;