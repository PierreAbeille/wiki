import styles from '../styles/components.module.scss';
import React from 'react';
import SidenavPart from './sidenav_part';


const Sidenav = () => {
    return (
        <div className={styles.sidenav}>
            <SidenavPart type='categories' />
            {/* <SidenavPart type='tags' /> */}
        </div>
    )
}


export default Sidenav;