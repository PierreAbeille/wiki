import styles from '../styles/components.module.scss'
import React from 'react';
import NavbarTab from './navbar_tab';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <a>
                                <Image src="/Logo.svg" width={168} height={40} />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <NavbarTab link='/articles' text='Articles' />
                    </li>
                    <li>
                        <NavbarTab link='/categories' text='Catégories' />
                    </li>
                </ul>
                <form action="/search" method="GET">
                    <input type="search" name="search" id="search" placeholder="Rechercher un article"/>
                    <input type="image" src="/IcRoundSearch.Svg" alt="Submit" />
                </form>
            </nav>
        </div>
    )
    }
    
export default Navbar;