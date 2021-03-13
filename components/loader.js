import styles from '../styles/loader.module.css';

export default function Loader() {
    return (
        <div className={styles.loader}>
            <div>
                <img alt="loading..." src="images/loading.gif" />
            </div>
        </div>
    );
}
