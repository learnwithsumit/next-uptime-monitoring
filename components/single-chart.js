import styles from '../styles/single-chart.module.css';

export default function SingleChart({ count = 0, status }) {
    return (
        <div className={styles.singleChart}>
            <div className={[styles.progress, styles.p12, styles.small].join(' ')}>
                <div className="slice">
                    <div className={styles.bar} />
                    <div className={styles.fill} />
                </div>
            </div>
            <div>
                <h1>{count}</h1>
                <p>{status} links</p>
            </div>
        </div>
    );
}
