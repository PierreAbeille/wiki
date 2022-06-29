//Make a react component for part of the sidenav. It must display a list of categories or tags.


import styles from '../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const SidenavPart = (type) => {
    const router = useRouter();
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/${type}`);
            const data = await res.json();
            setList(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <ul>
                {list.map(item => (
                    <li key={item.id}>
                        <Link href={`/${type}/${item.id}`}>
                            <a>{item.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default SidenavPart;