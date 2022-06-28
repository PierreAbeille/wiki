import styles from '../styles/components.module.scss';


const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loader__spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader;