import styles from '../styles/components.module.scss'
import Link from 'next/link';


const NavbarTab = ({link, text}) => {
    // add a isActive class to the link if the current page is the same as the link
    const isActive = link === `/${link.split('/')[1]}`;

    return (
        <Link href={link} className={styles.navbarLink}>
            <a className={isActive ? styles.active : ''}>{text}</a>
        </Link>
    )
}


export default NavbarTab;