//Make a sidenav component. It must display a SidenavPart for categories and a SidenavPart for tags. SidenavPart take as props only the type of the part.
//
import styles from '../styles/components.module.scss';
import React from 'react';
import SidenavPart from './sidenav_part';


const Sidenav = () => {
    return (
        <div className={styles.sidenav}>
            <SidenavPart type='categories' />
            <SidenavPart type='tags' />
        </div>
    )
}


export default Sidenav;