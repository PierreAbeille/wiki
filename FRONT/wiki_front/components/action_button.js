//make an action button component
// it will take as props an action, an icon, an alt, and a className
// it will render a clickable icon and the alt
// it will call the action when clicked


import styles from '../styles/components.module.scss';
import Link from 'next/link';


export default function ActionButton({ action, icon, alt, styleClass, text }) {
    return (
        <div className={styles.action_button}>
            <Link href={action}>
                <a>
                    {text && <span>{text}</span>}
                    {icon && <img src={icon} alt={alt} className={styleClass}/>}
                </a>
            </Link>
        </div>
    )
}