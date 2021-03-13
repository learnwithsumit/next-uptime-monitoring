import styles from '../styles/statusCard.module.css';

export default function StatusCard({ status, number }) {
    const statusStyles =
        status === 'up'
            ? [styles.icon, 'fas', 'fa-arrow-up', styles.upIcon]
            : [styles.icon, 'fas', 'fa-arrow-down', styles.downIcon];
    return (
        <div className="card">
            <i className={statusStyles.join(' ')} />
            <h4>{number}</h4>
            <p>{status === 'up' ? 'Up Links' : 'Down Links'}</p>
        </div>
    );
}
