import styles from '../styles/components.module.scss'
import React from 'react';
import NavbarTab from './navbar_tab';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <nav>
                <ul>
                    <li>
                        <NavbarTab link='/articles' text='Articles' />
                    </li>
                    <li>
                        <NavbarTab link='/categories' text='Catégories' />
                    </li>
                    <li>
                        <NavbarTab link='/tags' text='Tags' />
                    </li>
                </ul>
                <form>
                    <input type="search" placeholder="Search"/>
                    <button type="submit">Search</button>
                </form>
            </nav>
        </div>
    )
    }
    
export default Navbar;