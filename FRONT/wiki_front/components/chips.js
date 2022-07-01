//create a chips react component that will be used to display a tag with or without a delete button

import styles from '../styles/components.module.scss';
import Link from 'next/link';

export default function Chips({ tag, deleteTag }) {
    return (
        <div className={styles.chip}>
            <Link href={`/tag/${tag._id}`}>
                <a>{tag.name}</a>
            </Link>
            {deleteTag && 
                <Link href={`api/tag/delete/${tag._id}`}>
                    <a className={styles.chip__delete}>X</a>
                </Link>
            }
        </div>
    )
}