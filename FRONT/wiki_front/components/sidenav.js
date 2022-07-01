import styles from '../styles/components.module.scss';
import React from 'react';
import SidenavPart from './sidenav_part';
import Tags from '../pages/tags';


const Sidenav = () => {
    return (
        <div className={styles.sidenav}>
            <div>
                <h2>Catégories</h2>
                <SidenavPart type='categories' />
            </div>
            <div>
                <Tags />
            </div>
        </div>
    )
}


export default Sidenav;