import styles from '../styles/components.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const SidenavPart = (type) => {
    const router = useRouter();
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(true);

    const typeString = type.type;
    const typeStringShort = typeString.slice(0, -1);



    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/indexes/${typeString}`);
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
        <div className={styles.sidenav__part}>
            <ul>
                {list.map(item => (
                    <li>
                        <Link href={`/${typeStringShort}/${item._id}`}>
                            <a>{item.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default SidenavPart;